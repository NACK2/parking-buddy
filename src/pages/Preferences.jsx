import { FormControlLabel, Checkbox, Box } from '@mui/material';
import { useState } from 'react'

const Preferences = () => {
    const [parkades, setParkades] = useState(
        {
            "North Parkade": false,
            "West Parkade": false,
            "Rose Parkade": false,
            "Health Parkade": false,
            "Fraser Parkade": false,
            "Thunderbird Parkade": false
        }
    )

    return (
        <>
            { Object.keys(parkades).map(parkade => (
                <Box>
                    <FormControlLabel 
                        key={parkade} 
                        control={<Checkbox />} 
                        label={parkade} 
                        // onChange={}
                    />
                </Box>
            ))}
        </>
    )
}

export default Preferences