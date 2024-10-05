import { useState } from "react";

const Calendar = ({isPreferencesPage}) => {
    // Timetable array
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`);

    const [selectedTime, setSelectedTime] = useState()

    const handleTimeSlotClick = (hour, day) => {
        const timeSlotInfo = `${hour}, ${day}`;
        setSelectedTime(timeSlotInfo);
        console.log(timeSlotInfo);
      };

    return (
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
                    {daysOfWeek.map((day) => 
                        isPreferencesPage ? (
                        <td
                            key={day + index}
                            onClick={() => handleTimeSlotClick(hour, day)} 
                            style={{ cursor: "pointer", textAlign: "center" }}
                        >
                        </td>
                        ) : (
                            <td key={day + index}></td>
                        )
                    )}
                </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
    )
}

export default Calendar