import { Card, CardContent, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useRef } from "react";

const Calendar = ({isPreferencesPage}) => {
    const [selectedCells, setSelectedCells] = useState(new Set());  // Use Set to track selected cells
    const selectedTimesArr = Array.from(selectedCells).sort()

    const [isSelecting, setIsSelecting] = useState(false);
    const startCellRef = useRef(null); 

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
        '0:00 - 1:00', '1:00 - 2:00', '2:00 - 3:00', '3:00 - 4:00', '4:00 - 5:00',
        '5:00 - 6:00', '6:00 - 7:00', '7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00',
        '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
        '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
        '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00', '23:00 - 24:00'
    ];

    /*
    schedule = {
        monday: ["1-3", "5-7"],
        tuesday: ["4-7", "10-12"],
        ...
    }
    */
    
    const arrToObj = () => {
        const dayEnum = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
        }

        const result = selectedTimesArr.reduce((acc, curr) => {
            const [key, value] = curr.split('-').map(Number); // Split the string and convert to numbers
            const day = dayEnum[key]
        
            // If the key doesn't exist in the accumulator, initialize it with an empty array
            if (!acc[day]) {
                acc[day] = [];
            }
        
            // Push the value into the corresponding array for the key
            acc[day].push(value);
            
            return acc; // Return the updated accumulator
        }, {});

        return result
    }

    console.log(arrToObj())

    // Function to calculate the selected cells during dragging
    const calculateSelectedCells = (endCell) => {
        const [startCol, startRow] = startCellRef.current.split('-');
        const [endCol, endRow] = endCell.split('-');
        
        const rowStart = Math.min(startRow, endRow);
        const rowEnd = Math.max(startRow, endRow);
        const colStart = Math.min(startCol, endCol);
        const colEnd = Math.max(startCol, endCol);

        const newSelectedCells = new Set(selectedCells);  // Create a copy of selected cells

        for (let row = rowStart; row <= rowEnd; row++) {
            for (let col = colStart; col <= colEnd; col++) {
                newSelectedCells.add(`${col}-${row}`);  // Use col-row format
            }
        }

        setSelectedCells(newSelectedCells);  // Update state with newly selected cells
    };

    const handleMouseDown = (cellId) => {
        setIsSelecting(true);
        startCellRef.current = cellId;
        const newSelectedCells = new Set(selectedCells);  // Copy previous selection
        newSelectedCells.add(cellId);  // Add the starting cell to the Set
        setSelectedCells(newSelectedCells);  // Update the state
    };

    const handleMouseEnter = (cellId) => {
        if (isSelecting) {
            calculateSelectedCells(cellId);
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false); // End the selection process
    };
    

    return (
        <Grid item xs={12} onMouseUp={handleMouseUp}>
            <TableContainer component={Paper} sx={{ maxHeight: '500px', overflowY: 'scroll' }}>
            <Table stickyHeader>
                <TableHead>
                <TableRow>
                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>Time</TableCell>
                    {days.map((day, colIndex) => (
                        <TableCell key={day} sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>{day}</TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {timeSlots.map((time, rowIndex) => (
                    <TableRow key={time} sx={{ backgroundColor: rowIndex % 2 === 0 ? '#f1f8ff' : 'white' }}>
                    <TableCell sx={{ border: '1px solid #ccc', fontWeight: 'bold' }}>{time}</TableCell>
                    {days.map((day, colIndex) => {
                        const cellId = `${colIndex}-${rowIndex}`;
                        const isSelected = selectedCells.has(cellId);  // Check if the cell is in the selected set
                        return (
                        <TableCell
                            key={cellId}
                            onMouseDown={() => handleMouseDown(cellId)}
                            onMouseEnter={() => handleMouseEnter(cellId)}
                            sx={{
                            // border: '1px solid #ccc',
                            // cursor: 'pointer',
                            backgroundColor: isSelected ? '#81c784' : 'inherit',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                            }}
                        />
                        );
                    })}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
    )
}

export default Calendar