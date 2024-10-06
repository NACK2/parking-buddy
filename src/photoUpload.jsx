import React, { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { CircularProgress, Box, Button, TextField, Typography, Paper, InputLabel, FormControl, Select, MenuItem, Divider, Link } from '@mui/material';
var first = 0;

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
        <div>
            <Box>
                <InputLabel htmlFor="image-upload">Upload Image of Ticket</InputLabel>
                <Divider sx={{ marginBottom: 2 }} />
                <Button variant='contained' component='label' sx={{ mb: 2 }}>
                    Upload
                    <input type="file" hidden accept="image/*" onChange={handleUpload} />
                </Button>
                <div>
                    {!text && file ? <CircularProgress /> : ""}
                    {plate && <p>{plate}</p>}
                    {time && <p>{time}</p>}
                    {location && <p>{location}</p>}
                </div>
            </Box>
            <Box>
                <Link>input fields manually</Link>
                <Button onClick={() => {
                    parseText(testText);
                }}>test</Button>
            </Box>
        </div>
    )
}

export default PhotoUpload;