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

const CreateSnippet = () => {
  const [snippetData, setSnippetData] = useState({
    title: "",
    language: "",
    code: "",
    description: "",
    tags: [],
  });

  const handleInputChange = (event) => {
    setSnippetData({
      ...snippetData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!snippetData.title || !snippetData.language || !snippetData.code) {
      alert("Title, language, and code are required");
      return;
    }

    if (snippetData.tags.length === 0) {
      alert("At least one tag is required");
      return;
    }

    snippetData.tags = snippetData.tags.map((tag) => tag.toLowerCase());

    console.log(snippetData);
    

    try {
      const res = await fetch("http://localhost:5000/api/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snippetData),
      });
    

      if (!res.ok) throw new Error("Failed to create snippet");

      const data = await res.json();
      console.log("Created:", data);
      alert("Snippet created successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  {/* const handleEditorChange = (value) => {
    setSnippetData({ ...snippetData, code: value });
  }; */}

  return (
    <Box
      sx={{
        mb: 2,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(135deg, #352f42ff 10%, #242838ff 100%)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create a Code Snippet
      </Typography>

      <Stack spacing={2}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            borderColor: "white",
          }}
        >
          <Grid item xs={12}>
            <TextField
              label="Snippet Title"
              name="title"
              value={snippetData.title}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Language"
              name="language"
              value={snippetData.language}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={snippetData.description}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              color: "#8978b1ff",
              borderColor: "#8978b1ff",
            }}
          >
            <TextField
              label="Tags (comma-separated)"
              name="tags"
              value={snippetData.tags.join(", ")}
              onChange={(event) => {
                const tags = event.target.value.split(",");
                setSnippetData({ ...snippetData, tags });
              }}
              fullWidth
            />
            {snippetData.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Editor
              height="250px"
              width="600px"
              theme="vs-dark"
              language={snippetData.language}
              value={snippetData.code}
               options={{
                  readOnly: false,
                  minimap: { enabled: true },
                  fontSize: 15,
                  wordWrap: "on",
                  automaticLayout: true,
                  scrollBeyondLastLine: false

                }}
              onChange={(value) =>
                setSnippetData({ ...snippetData, code: value })
              }
            />
          </Grid>
          {/* Add more form fields for other snippet properties */}
        </Grid>

       
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            borderColor: "white",
          }}
        >   
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            
            width: "100px",
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Save Snippet
        </Button>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CreateSnippet;
