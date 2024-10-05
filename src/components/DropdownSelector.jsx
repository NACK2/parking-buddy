import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';

const DropdownSelector = ({setParkades, parkade, length}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{width: 60}}>
                <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    // label="Age"
                    // onChange={handleChange}
                    sx={{height: 40}}
                >
                    {Array.from(length).map((_, i) => (
                        <MenuItem key={i} value={i}>{i+1}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography sx={{ marginLeft: 2 }}>{parkade}</Typography>
        </Box>
    )
}

export default DropdownSelector