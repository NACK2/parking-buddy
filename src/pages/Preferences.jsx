import { useState } from 'react'
import Calendar from '../components/Calendar';
import DropdownSelector from '../components/dropdownSelector';

const Preferences = () => {
    const [parkades, setParkades] = useState(
        {
            "North Parkade": 0,
            "West Parkade": 1,
            "Rose Parkade": 2,
            "Health Parkade": 3,
            "Fraser Parkade": 4,
            "Thunderbird Parkade": 5
        }
    )

    const [selectedTime, setSelectedTime] = useState()

    const handleTimeSlotClick = (hour, day) => {
        const timeSlotInfo = `Time Slot: ${hour} on ${day}`;
        setSelectedTime(timeSlotInfo); // Update selected time slot info
        console.log(timeSlotInfo); // Log or handle the time slot information as needed
      };

    return (
        <>
            {Object.keys(parkades).map((parkade, i) => (
                <DropdownSelector key={i} parkades={parkades} setParkades={setParkades} parkade={parkade}/>
            ))}

            <Calendar/>

            {/* <div style={{ flex: "3" }}>
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
                            <td
                                key={day + index}
                                onClick={() => handleTimeSlotClick(hour, day)} // Add click handler
                                style={{ cursor: "pointer", textAlign: "center" }} // Change cursor to pointer for better UX
                            >
                            </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div> */}
        </>
    )
}

export default Preferences