import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { CircularProgress, Box, Button, TextField, Typography, Paper, InputLabel, FormControl, Select, MenuItem, Divider, Link } from '@mui/material';

const PhotoUpload = () => {
    const [file, setFile] = useState(null)
    const [text, setText] = useState("")

    async function imageToText(image) {
        const worker = await createWorker("eng");
        const { data } = await worker.recognize(image);
        setText(data.text)
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
                    <div>
                        {!text && file ? <CircularProgress /> : ""}
                        {text && <p>result of image to text: <br /> {text}</p>}
                    </div>
                </Button>
            </Box>
            <Box>
                <Link>input fields manually</Link>
            </Box>
        </div>
    )
}

export default PhotoUpload;