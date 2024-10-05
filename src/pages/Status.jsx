import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";
// Dummy data for parking group
const parkingGroup = {
  groupName: "Group A",
  location: "Lot 3",
  members: ["Alice", "Bob", "John"],
};

const statusOptions = ["Matched", "Unmatched", "Profile Not Complete"];

const Status = () => {
  // Status state
  const [status, setStatus] = useState(statusOptions[0]);

  return (
    <div >
      
      {/* Navbar */}
      <div className='navbar-container'>
            <Navbar />
        </div>

      {/* Header */}
      <div style={{ padding: "10px", marginBottom: "20px", paddingTop:"70px" }}>
        <h2>Status: {status}</h2>
      </div>

      {/* Container to hold Parking Group and Timetable side by side */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        
        {/* Parking Group */}
        <div style={{ maxHeight: "455px", flex: "1", marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Parking Group</h3>
          <p><strong>Group Name:</strong> {parkingGroup.groupName}</p>
          <p><strong>Location:</strong> {parkingGroup.location}</p>
          <p><strong>Members:</strong> {parkingGroup.members.join(", ")}</p>
        </div>

        <Calendar/>
      </div>
    </div>
  );
};

export default Status;