import React, { useEffect, useState } from "react";

const Users = () => {
  const [data, setData] = useState([]);
  const [owners, setOwners] = useState([]); // Store owners in state
  const [nonOwners, setNonOwners] = useState([]); // Store non-owners in state
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json(); // Parse the response into JSON
        console.log('Users fetched from API:', data); // Add logging for fetched data
        setData(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData(); // Call the async function to fetch the data
  }, []);

  // This effect is triggered once `data` is populated
  useEffect(() => {
    if (data.length > 0) {
      console.log('Populating owners and non-owners with fetched data');
      parseOwnersAndNonOwners(data);
    }
  }, [data]); // Trigger whenever `data` changes

  // This effect runs the matching algorithm when owners and non-owners are populated
  useEffect(() => {
    if (owners.length > 0 && nonOwners.length > 0) {
      console.log(1); // Debugging to check if this part is reached
      console.log('Owners:', owners); // Debugging to check owners
      console.log('Non-Owners:', nonOwners); // Debugging to check non-owners
      console.log('Running stable matching algorithm');

      // Run the stable matching algorithm
      const finalMatches = stableMatching(owners, nonOwners);
      setMatches(finalMatches); // Set the matches to state
    }
  }, [owners, nonOwners]); // Trigger whenever `owners` or `nonOwners` changes

  // Parse data into owners and non-owners and store them in state
  const parseOwnersAndNonOwners = (data) => {
    const owners = [];
    const nonOwners = [];

    data.forEach((item) => {
      if (item.owner === "Yes") {
        owners.push(item);
      } else {
        nonOwners.push(item);
      }
    });

    console.log('Parsed Owners:', owners); // Debugging to check parsed owners
    console.log('Parsed Non-Owners:', nonOwners); // Debugging to check parsed non-owners

    setOwners(owners); // Store owners in state
    setNonOwners(nonOwners); // Store non-owners in state
  };

  // Function to check if two schedules are compatible
function isScheduleCompatible(owner, nonOwner) {
    console.log('Checking compatibility between:', owner.email, 'and', nonOwner.email);
  
    for (let day in owner.Schedule) {
      // Check if the nonOwner has a schedule for this day
      if (nonOwner.Schedule[day]) {
        const ownerTimeRange = owner.Schedule[day];
        const nonOwnerTimeRange = nonOwner.Schedule[day];
  
        // Ensure both are strings before trying to split
        if (typeof ownerTimeRange === 'string' && typeof nonOwnerTimeRange === 'string') {
          const ownerTimeRangeArray = ownerTimeRange.split("-").map(Number);
          const nonOwnerTimeRangeArray = nonOwnerTimeRange.split("-").map(Number);
  
          // Check if their times overlap
          if (timeRangesOverlap(ownerTimeRangeArray, nonOwnerTimeRangeArray)) {
            return true; // If overlap is found, they are compatible
          }
        } else {
          console.warn('Invalid time range format for owner or non-owner on day:', day);
        }
      }
    }
  
    return false; // If no overlap found, they are not compatible
  }

  function timeRangesOverlap(range1, range2) {
    // Check if the ranges are non-overlapping:
    return range1[1] <= range2[0] || range1[0] >= range2[1];
}

function stableMatching(owners, nonOwners) {
    let unmatchedNonOwners = [...nonOwners]; // Clone the non-owners list
    let proposals = new Map(); // Track proposals by non-owners (how many times they've proposed)

    // Initialize all proposal indices to 0 for each non-owner
    nonOwners.forEach((nonOwner) => proposals.set(nonOwner, 0));

    // Iterate until there are no more unmatched non-owners
    while (unmatchedNonOwners.length > 0) {
        let nonOwner = unmatchedNonOwners[0]; // Get the first unmatched non-owner

        // Get the current owner based on the non-owner's proposal index
        let ownerIndex = proposals.get(nonOwner);

        // Check if the non-owner has proposed to all owners
        if (ownerIndex >= owners.length) {
            console.error(`Non-owner ${nonOwner.email} has proposed to all owners and failed.`);
            unmatchedNonOwners.shift(); // Remove this non-owner from the unmatched list as they have no more owners to propose to
            continue; // Continue to the next non-owner
        }

        let owner = owners[ownerIndex];

        // Ensure both owner and non-owner have Parking Lot defined
        const ownerParkingLots = owner["Parking Lot"] ? Object.keys(owner["Parking Lot"]) : [];
        const nonOwnerParkingLots = nonOwner["Parking Lot"] ? Object.keys(nonOwner["Parking Lot"]) : [];

        // If shared parking lots exist and schedules are compatible, match them
        const sharedParkingLots = ownerParkingLots.filter(lot => nonOwnerParkingLots.includes(lot));

        // Check if the current owner is available for matching based on parking lots and schedules
        if (sharedParkingLots.length > 0 && isScheduleCompatible(owner, nonOwner)) {
            if (!owner.match) {
                // If the owner is not matched, accept the proposal
                console.log(`Matching ${nonOwner.email} with ${owner.email}`);
                owner.match = nonOwner;
                nonOwner.match = owner;
                unmatchedNonOwners.shift(); // Remove the matched non-owner from the unmatched list
            } else {
                // If the owner is already matched, we skip and try the next owner.
                proposals.set(nonOwner, ownerIndex + 1); // Move on to the next owner for this non-owner
            }
        } else {
            // Increment the proposal index for the current non-owner to try the next owner
            proposals.set(nonOwner, ownerIndex + 1);
        }
    }

    // Collect the final matches
    let matches = owners.map((owner) => {
        return [owner.email, owner.match ? owner.match.email : "No match"];
    });
    console.log('Final matches:', matches); // Debugging to check final matches
    return matches;
}


  return (
    <div>
      <h2>Matches</h2>
      {matches.length > 0 ? (
        matches.map((match, index) => (
          <div key={index}>
            <p>
              {match[0]} matched with {match[1]}
            </p>
          </div>
        ))
      ) : (
        <p>Loading matches...</p>
      )}
    </div>
  );
};

export default Users;
