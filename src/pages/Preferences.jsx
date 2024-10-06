import { useState } from 'react'
import { Grid } from '@mui/material'
import Calendar from '../components/Calendar';
import DropdownSelector from '../components/dropdownSelector';

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
                <Grid item xs={3}>
                    {Object.keys(parkades).map((parkade, i) => (
                        <DropdownSelector key={i} parkades={parkades} setParkades={setParkades} parkade={parkade}/>
                    ))}
                </Grid>

                <Grid item xs={9}>
                    <Calendar isPreferencesPage={true}/>
                </Grid>
            </Grid>
        </>
    )
}

export default Preferences