//edit snippet page 

import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Stack,
    Button,
    Chip,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDemoData } from "../../components/demoData";

const EditSnippet = () => {
    const { id } = useParams();
    const { snippets } = useDemoData();
    const snippet = snippets.find((s) => s.id === parseInt(id));
    const [title, setTitle] = useState(snippet.title);
    const [description, setDescription] = useState(snippet.description);
    const [code, setCode] = useState(snippet.code);
    const [language, setLanguage] = useState(snippet.language);
    const navigate = useNavigate();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCodeChange = (value) => {
        setCode(value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSave = () => {
        const updatedSnippet = { ...snippet, title, description, code, language };
        navigate(`/snippets/${snippet.id}`, { state: { snippet: updatedSnippet } });
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Edit Snippet
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Editor
                        height="400px"
                        language={language}
                        value={code}
                        onChange={handleCodeChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Language"
                        value={language}
                        onChange={handleLanguageChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Link to={`/snippets/${snippet.id}`}>
                            <Button variant="outlined">Cancel</Button>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditSnippet;