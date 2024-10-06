import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';

const DropdownSelector = ({parkades, setParkades, parkade}) => {
    const handleChange = (event) => {
        setParkades(prevParkades => (
            {...prevParkades, [parkade]: event.target.value}
        ))
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FormControl sx={{width: 60 }}>
                <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    value={parkades[parkade]}
                    // label="Age"
                    onChange={handleChange}
                    sx={{height: 40}}
                >
                    {Object.keys(parkades).map((_, i) => (
                        <MenuItem key={i} value={i+1}>{i+1}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography sx={{ marginLeft: 2 }}> {parkade} </Typography>
        </Box>
    )
}

export default DropdownSelector