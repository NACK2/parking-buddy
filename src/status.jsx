import React, { useState } from "react";
import Navbar from "./Navbar";
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

  // Timetable array
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`);

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

        {/* Timetable with scrollable hours */}
        <div style={{ flex: "3" }}>
          <div style={{ maxHeight: "455px", overflowY: "scroll", border: "1px solid #ccc" }}>
            <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th>Time</th>
                  {daysOfWeek.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((hour, index) => (
                  <tr key={hour}>
                    <td>{hour}</td>
                    {daysOfWeek.map((day) => (
                      <td key={day + index}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;