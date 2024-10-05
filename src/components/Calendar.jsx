const Calendar = () => {
    // Timetable array
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`);

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
                    {daysOfWeek.map((day) => (
                      <td key={day + index}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}

export default Calendar