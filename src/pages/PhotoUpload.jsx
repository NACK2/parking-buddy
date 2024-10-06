import React, { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { CircularProgress, Box, Button, TextField, Typography, Paper, InputLabel, FormControl, Select, MenuItem, Divider, Link } from '@mui/material';

const PhotoUpload = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [plate, setPlate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const testText =
        `THE UNIVERSITY OF BRITISH COLUMBIA TRAFFIC NOTICE 
    Traffic Notice #: 
    Issue Date: 06/28/2024 
    Issue Time: 15:51 Officer: 438
    Location: MSL
    Violation: 12(J) Meter #:
    Parking Without Authorization
    
    Plate #: DS881G`

    function parseText(text) {
        // plate parsing
        var size = text.length;
        var plateIndexBegin = text.indexOf("Plate #:");
        if (plateIndexBegin == -1) setPlate("Unable to extract plate: please use a better photo");
        else {
            plateIndexBegin += 8;
            while (text[plateIndexBegin] == ' ') plateIndexBegin++;
            var plateIndexEnd = plateIndexBegin;
            while (text[plateIndexEnd] != ' ' && plateIndexEnd < size) plateIndexEnd++;
            var plateNumber = ""
            for (let i = plateIndexBegin; i < plateIndexEnd; ++i) {
                plateNumber += text[i];
            }
            const regex = /[A-Z0-9]{1,7}/g;
            plateNumber = plateNumber.match(regex)
            setPlate(plateNumber);
        }

        // time parsing
        var timeIndexBegin = text.indexOf("Time:");
        if (timeIndexBegin == -1) setTime("Unable to extract location: please use a better photo");
        else {
            timeIndexBegin += 5;
            while (text[timeIndexBegin] == ' ') timeIndexBegin++;
            var timeIndexEnd = timeIndexBegin;
            while (text[timeIndexEnd] != ' ' && timeIndexEnd < size) timeIndexEnd++;
            var timeIssued = ""
            for (let i = timeIndexBegin; i < timeIndexEnd; ++i) {
                timeIssued += text[i];
            }
            setTime(timeIssued);
        }

        // location parsing
        var locIndexBegin = text.indexOf("Location:");
        if (locIndexBegin == -1) setLocation("Unable to extract time issued: please use a better photo");
        else {
            locIndexBegin += 9;
            while (text[locIndexBegin] == ' ') locIndexBegin++;
            var locIndexEnd = locIndexBegin;
            while (text[locIndexEnd] != ' ' && locIndexEnd < size) locIndexEnd++;
            var loc = ""
            for (let i = locIndexBegin; i < locIndexEnd; ++i) {
                loc += text[i];
            }
            setLocation(loc);
        }

        console.log(loc);
        console.log(timeIssued);
        console.log(plateNumber);
    }

    async function imageToText(image) {
        const worker = await createWorker("eng");
        const { data } = await worker.recognize(image)
        setText(data.text);
        console.log(data.text);
        parseText(data.text);
    }

    const handleUpload = (e) => {
        setFile(null);
        setText("");
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile)
            imageToText(selectedFile)
        }
    }

    return (
        <>
            <Paper elevation={3} sx={{ mb: 4, padding: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Upload Image of Ticket
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Box>
                    <Button variant='contained' component='label' sx={{ mt: 1 }}>
                        Upload
                        <input type="file" hidden accept="image/*" onChange={handleUpload} />
                    </Button>
                    <div>
                        {!text && file ? <CircularProgress /> : ""}
                        {plate && <Typography variant="body1">Plate: {plate}</Typography>}
                        {time && <Typography variant="body1">Time: {time}</Typography>}
                        {location && <Typography variant="body1">Location: {location}</Typography>}
                    </div>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ mt: 2, padding: 3, maxWidth: 600, mx: 'auto' }}>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Or Manually Input Fields
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <form>
                        <TextField
                            fullWidth
                            label="Plate #"
                            variant="outlined"
                            margin="normal"
                            value={plate}
                            onChange={(e) => setPlate(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Time Issued"
                            variant="outlined"
                            margin="normal"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Location"
                            variant="outlined"
                            margin="normal"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </form>
                </Box>
            </Paper>
        </>
    )
}

export default PhotoUpload;