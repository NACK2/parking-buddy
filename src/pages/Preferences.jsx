import { useState } from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import Calendar from '../components/Calendar';
import DropdownSelector from '../components/dropdownSelector';
import ParkadeMap from '../components/Map';

const Preferences = () => {
    const [parkades, setParkades] = useState(
        {
            "North Parkade": 1,
            "West Parkade": 2,
            "Rose Parkade": 3,
            "Fraser Parkade": 4,
            "Thunderbird Parkade": 5
        }
    )

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
        </>
    )
}

export default Preferences