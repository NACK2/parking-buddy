import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import Calendar from '../components/Calendar';

const Status = () => {
  const group = {
    status: 'Matched',
    location: 'North Parkade',
    members: ['Alice', 'Bob', 'John'],
  };

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

  return (
    <Grid container spacing={2} justifyContent="center">
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
      <Calendar />
    </Grid>
  );
};

export default Status;
