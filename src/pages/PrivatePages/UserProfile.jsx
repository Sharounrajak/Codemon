// pages/public/ExplorePage.jsx
import React, { useState, useEffect } from "react";
import { Typography, Box, Container, Grid, Button, Card, CardContent, CardActions } from "@mui/material";
import { Editor } from "@monaco-editor/react";

export default function UserProfile() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSnippet, setEditingSnippet] = useState(null); // Fixed naming

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/snippets/user/user-123"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw response data:", data);

        // Handle different response structures
        if (data.snippets) {
          setSnippets(Array.isArray(data.snippets) ? data.snippets : []);
        } else if (data.data) {
          setSnippets(Array.isArray(data.data) ? data.data : []);
        } else {
          setSnippets(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching snippets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  // UPDATE API CALL
  const updateSnippet = async (snippetId, updatedSnippet) => {
    console.log("🔄 Starting update for snippet:", snippetId);
    console.log("📦 Data being sent:", updatedSnippet);
    
    try {
      // Send only the fields your backend expects
      const dataToSend = {
        title: updatedSnippet.title,
        description: updatedSnippet.description,
        code: updatedSnippet.code,
        language: updatedSnippet.language,
        // Don't send user info or other metadata
      };
      
      console.log("📦 Cleaned data being sent:", dataToSend);
      
      const response = await fetch(
        `http://localhost:5000/api/snippets/${snippetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      
      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Response error:", errorText);
        throw new Error(`Failed to update: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("✅ Snippet updated successfully:", data);
      
      // Stop editing mode after successful update
      setEditingSnippet(null);
      
    } catch (error) {
      console.error("❌ Error updating snippet:", error);
      alert(`Update failed: ${error.message}`);
    }
  };

  // DELETE API CALL
  const deleteSnippet = async (snippetId) => {
    console.log("🗑️ Starting delete for snippet:", snippetId);
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/snippets/${snippetId}`,
        {
          method: "DELETE",
        }
      );
      
      console.log("📡 Delete response status:", response.status);
      console.log("📡 Delete response ok:", response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Delete response error:", errorText);
        throw new Error(`Failed to delete: ${response.status} - ${errorText}`);
      }
      
      console.log("✅ Snippet deleted successfully");
      
      // Remove snippet from local state immediately
      setSnippets(prev => prev.filter(snippet => snippet.id !== snippetId));
      
    } catch (error) {
      console.error("❌ Error deleting snippet:", error);
      alert(`Delete failed: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "#f8fafc" }}>
          Loading snippets...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "#ef4444" }}>
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            color: "#f8fafc",
            fontWeight: 700,
            mb: 4,
            textAlign: "center",
          }}
        >
          User Profile
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#f8fafc",
            fontWeight: 700,
            mb: 4,
            textAlign: "center",
          }}
        >
          My Snippets ({snippets.length})
        </Typography>

        <Grid container spacing={3}>
          {snippets.length > 0 ? (
            snippets.map((snippet) => (
              <Grid item xs={12} sm={6} md={4} key={snippet.id || snippet._id}>
                <Card sx={{ 
                  backgroundColor: "#1e293b", 
                  color: "#f8fafc", 
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Title */}
                    <Typography variant="h6" gutterBottom sx={{ color: "#f8fafc" }}>
                      {snippet.title}
                    </Typography>
                    
                    {/* Description */}
                    <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
                      {snippet.description}
                    </Typography>
                    
                    {/* Monaco Editor - THE MAGIC HAPPENS HERE */}
                    <Box sx={{ height: "200px", mb: 2 }}>
                      <Editor
                        height="100%"
                        language={snippet.language}
                        value={snippet.code}
                        theme="vs-dark"
                        readOnly={editingSnippet !== (snippet.id || snippet._id)} // 🔥 FIXED LOGIC
                        onChange={(newCode) => {
                          console.log("⌨️ Code changed for snippet:", snippet.id);
                          console.log("📝 New code:", newCode);
                          console.log("🔍 Currently editing:", editingSnippet);
                          console.log("🔍 This snippet ID:", snippet.id);
                          
                          // ONLY update if this snippet is being edited
                          if (editingSnippet === (snippet.id || snippet._id)) {
                            setSnippets(prev => prev.map(s => 
                              (s.id || s._id) === (snippet.id || snippet._id) ? {...s, code: newCode} : s
                            ));
                          }
                        }}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 12,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                        }}
                      />
                    </Box>
                    
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      Language: {snippet.language}
                    </Typography>
                  </CardContent>
                  
                  {/* CONDITIONAL BUTTON RENDERING */}
                  <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                    {editingSnippet === (snippet.id || snippet._id) ? (
                      // EDITING MODE - Show Save & Cancel
                      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ 
                            backgroundColor: "#22c55e",
                            "&:hover": { backgroundColor: "#16a34a" }
                          }}
                          onClick={() => {
                            console.log("💾 Save button clicked for snippet:", snippet.id || snippet._id);
                            console.log("📄 Current snippet data:", snippet);
                            updateSnippet(snippet.id || snippet._id, snippet);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ 
                            color: "#94a3b8",
                            borderColor: "#94a3b8"
                          }}
                          onClick={() => {
                            console.log("❌ Cancel button clicked");
                            setEditingSnippet(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : (
                      // VIEW MODE - Show Edit & Delete
                      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ 
                            backgroundColor: "#3b82f6",
                            "&:hover": { backgroundColor: "#2563eb" }
                          }}
                          onClick={() => {
                            console.log("🖊️ Edit button clicked for snippet:", snippet.id || snippet._id);
                            setEditingSnippet(snippet.id || snippet._id);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ 
                            backgroundColor: "#ef4444",
                            "&:hover": { backgroundColor: "#dc2626" }
                          }}
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${snippet.title}"?`)) {
                              deleteSnippet(snippet.id || snippet._id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  color: "#f8fafc",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                No snippets found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}