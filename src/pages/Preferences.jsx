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

    const handleChange = (event) => {
        const parkade = event.target.value
        setParkades(prevState => (
            {
                ...prevState, 
                [parkade]: !parkades[parkade]
            }))
    }

    console.log(parkades)

    return (
        <>
            { Object.keys(parkades).map(parkade => (
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <FormControlLabel 
                        key={parkade} 
                        control={<Checkbox />} 
                        label={parkade} 
                        value={parkade}
                        onChange={handleChange}
                    />
                </Box>
            ))}
        </>
    )
}

export default Preferences