import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';

const Status = () => {
  const [selectedCells, setSelectedCells] = useState(new Set());  // Use Set to track selected cells
  const [isSelecting, setIsSelecting] = useState(false);          // State to track dragging
  const startCellRef = useRef(null);                              // Ref to store the first cell of the selection

  const group = {
    status: 'Matched',
    location: 'North Parkade',
    members: ['Alice', 'Bob', 'John'],
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '0:00 - 1:00', '1:00 - 2:00', '2:00 - 3:00', '3:00 - 4:00', '4:00 - 5:00',
    '5:00 - 6:00', '6:00 - 7:00', '7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00',
    '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
    '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
    '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00', '23:00 - 24:00'
  ];

  const cardData = [
    {
      label: 'Matching Status',
      value: group.status,
      color: '#fdd835',
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#fdd835' }} />,
    },
    {
      label: 'Location',
      value: group.location,
      color: '#9575cd',
      icon: <PlaceIcon sx={{ fontSize: 40, color: '#9575cd' }} />,
    },
    {
      label: 'Members',
      value: group.members.join(', '),
      color: '#f06292',
      icon: <GroupIcon sx={{ fontSize: 40, color: '#f06292' }} />,
    },
    {
      label: "Today's Availability",
      value: 'All slots available!',
      color: '#81c784',
      icon: <CalendarTodayIcon sx={{ fontSize: 40, color: '#81c784' }} />,
    },
    {
      label: 'Upcoming Event',
      value: 'Parking Lot Maintenance Friday',
      color: '#ff7043',
      icon: <EventIcon sx={{ fontSize: 40, color: '#ff7043' }} />,
    },
  ];

  // Function to calculate the selected cells during dragging
  const calculateSelectedCells = (endCell) => {
    const [startRow, startCol] = startCellRef.current.split('-');
    const [endRow, endCol] = endCell.split('-');
    
    const rowStart = Math.min(startRow, endRow);
    const rowEnd = Math.max(startRow, endRow);
    const colStart = Math.min(startCol, endCol);
    const colEnd = Math.max(startCol, endCol);

    const newSelectedCells = new Set(selectedCells);  // Create a copy of selected cells

    for (let row = rowStart; row <= rowEnd; row++) {
      for (let col = colStart; col <= colEnd; col++) {
        newSelectedCells.add(`${row}-${col}`);  // Add the selected cells to the Set
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
    <Grid container spacing={2} justifyContent="center" onMouseUp={handleMouseUp}>
      {/* Adapted Cards Section */}
      {cardData.map((data, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {data.icon}
              <Box sx={{ marginLeft: '10px' }}>
                <Typography variant="body2" color="textSecondary">
                  {data.label}
                </Typography>
                <Typography variant="h5" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                  {data.value}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}

      {/* Schedule Section */}
      <Grid item xs={12}>
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
                    const cellId = `${rowIndex}-${colIndex}`;
                    const isSelected = selectedCells.has(cellId);  // Check if the cell is in the selected set
                    return (
                      <TableCell
                        key={cellId}
                        onMouseDown={() => handleMouseDown(cellId)}
                        onMouseEnter={() => handleMouseEnter(cellId)}
                        sx={{
                          border: '1px solid #ccc',
                          cursor: 'pointer',
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
    </Grid>
  );
};

export default Status;
