class Person {
    constructor(name, schedule, preferences) {
        this.name = name;
        this.schedule = schedule; // Schedule as time ranges per day
        this.preferences = preferences; // Ranked list of parking lot preferences (A, B, C)
        this.match = null; // Current match, initially null
    }
}

// Function to check if two schedules have any overlapping time ranges
function isScheduleCompatible(owner, nonOwner) {
    for (let day in owner.schedule) {
        if (nonOwner.schedule[day]) {
            const ownerSlots = owner.schedule[day];
            const nonOwnerSlots = nonOwner.schedule[day];

            // Compare each time range for potential overlap
            for (let ownerSlot of ownerSlots) {
                for (let nonOwnerSlot of nonOwnerSlots) {
                    if (timeRangesOverlap(ownerSlot, nonOwnerSlot)) {
                        // Found overlapping time range
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// Function to check if two time ranges overlap
function timeRangesOverlap(range1, range2) {
    // A range [start1, end1] overlaps with [start2, end2] if:
    return range1[0] < range2[1] && range1[1] > range2[0];
}

// Gale-Shapley Stable Matching Algorithm for complex schedules
function stableMatching(owners, nonOwners) {
    let unmatchedNonOwners = [...nonOwners]; // Clone the non-owners list
    let proposals = new Map(); // Track proposals by non-owners (how many times they've proposed)

    nonOwners.forEach(nonOwner => proposals.set(nonOwner, 0)); // Initialize all proposal indices to 0

    while (unmatchedNonOwners.length > 0) {
        let nonOwner = unmatchedNonOwners[0];

        // Get the current owner based on the non-owner's preference list
        let ownerIndex = proposals.get(nonOwner);
        let owner = owners[ownerIndex];

        if (isScheduleCompatible(owner, nonOwner)) {
            if (owner.match === null) {
                // If the owner is not matched, accept the proposal
                owner.match = nonOwner;
                nonOwner.match = owner;
                unmatchedNonOwners.shift(); // Remove the matched non-owner from the unmatched list
            } else {
                // Owner is already matched, compare the current match with the new proposal
                let currentMatch = owner.match;
                if (owner.preferences.indexOf(nonOwner) < owner.preferences.indexOf(currentMatch)) {
                    // If the new proposal is preferred, break the current match
                    currentMatch.match = null;
                    unmatchedNonOwners.push(currentMatch); // Add the current match back to unmatched list

                    // Accept the new match
                    owner.match = nonOwner;
                    nonOwner.match = owner;
                    unmatchedNonOwners.shift(); // Remove the newly matched non-owner from unmatched list
                }
            }
        }

        // Increment the proposal index for the current non-owner
        proposals.set(nonOwner, ownerIndex + 1);
    }

    // Collect the final matches
    let matches = owners.map(owner => {
        return [owner.name, owner.match ? owner.match.name : null];
    });

    return matches;
}

// Example setup with time ranges and parking lot preferences
const owners = [
    new Person("Owner1", {
        Monday: [[12, 15], [18, 21]], // Available 12:00-15:00 and 18:00-21:00 on Monday
        Tuesday: [[10, 13], [14, 17]]
    }, ["A", "B", "C"]), // Parking lot preferences for Owner1

    new Person("Owner2", {
        Monday: [[9, 12], [13, 16]], // Available 9:00-12:00 and 13:00-16:00 on Monday
        Tuesday: [[8, 11]]
    }, ["B", "A", "C"]), // Parking lot preferences for Owner2

    new Person("Owner3", {
        Monday: [[15, 18]], // Available 15:00-18:00 on Monday
        Tuesday: [[12, 15]]
    }, ["C", "B", "A"]) // Parking lot preferences for Owner3
];

const nonOwners = [
    new Person("NonOwner1", {
        Monday: [[14, 17], [19, 21]], // Available 14:00-17:00 and 19:00-21:00 on Monday
        Tuesday: [[9, 12]]
    }, ["A", "B", "C"]), // Parking lot preferences for NonOwner1

    new Person("NonOwner2", {
        Monday: [[9, 12], [13, 15]], // Available 9:00-12:00 and 13:00-15:00 on Monday
        Tuesday: [[10, 13]]
    }, ["B", "A", "C"]), // Parking lot preferences for NonOwner2

    new Person("NonOwner3", {
        Monday: [[16, 19]], // Available 16:00-19:00 on Monday
        Tuesday: [[12, 14]]
    }, ["C", "B", "A"]) // Parking lot preferences for NonOwner3
];

// Run the stable matching algorithm
const matches = stableMatching(owners, nonOwners);
console.log(matches);
