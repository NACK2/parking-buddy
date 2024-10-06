import { useState } from 'react'
import { Grid, Paper, Typography, Button } from '@mui/material'
import Calendar from '../components/Calendar';
import DropdownSelector from '../components/dropdownSelector';
import ParkadeMap from '../components/Map';
import axios from 'axios';

const Preferences = () => {
    const [parkades, setParkades] = useState(
        {
            "North Parkade": -1,
            "West Parkade": -1,
            "Rose Parkade": -1,
            "Fraser Parkade": -1,
            "Thunderbird Parkade": -1
        }
    )

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5050/users');
            console.log('Users:', response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = () => {
        fetchUsers()    
    }

//     fetch('http://localhost:5050/users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "id": "1",
//         "owner": "No",
//         "Group": ["Long Man", "Alevi"],
//         "Parking Lot": {}, // Ensure 'parkades' is defined and not empty
//         "email": "deeznuts@yahoo.ca",
//         "Schedule": {}
//     })
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok ' + response.statusText);
//     }
//     return response.json();
// })
// .then(data => {
//     console.log('Response:', data);
// })
// .catch(error => {
//     console.error('Error:', error);
// });


    console.log('Parkades:', parkades);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={2.5} sx={{ my: 'auto' }}>
                    <Paper elevation={3} sx={{ mt: 2, padding: 3, maxWidth: 400 }}>
                        <Typography variant='h6' textAlign='left'>Preferences</Typography>
                        {Object.keys(parkades).map((parkade, i) => (
                            <DropdownSelector key={i} parkades={parkades} setParkades={setParkades} parkade={parkade}/>
                        ))}
                    </Paper>
                </Grid>
                
                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Paper elevation={3} sx={{ mt: 2, padding: 3 }}>
                        <ParkadeMap/>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ mt: 2, padding: 3 }}>
                        <Calendar isPreferencesPage={true}/>
                    </Paper>
                </Grid>
            </Grid>

            <Grid item xs={3} mt={2} size="large">
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Grid>
        </>
    )
}

export default Preferences