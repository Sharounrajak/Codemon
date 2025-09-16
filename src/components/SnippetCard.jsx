// components/SnippetCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeSnippetViewer from "./CodeViewer";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
export default function SnippetCard({ snippet }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Show/hide full code

  const getLanguageColor = (language) => {
    const colors = {
      javascript: "#f7df1e",
      python: "#3776ab",
      css: "#1572b6",
      sql: "#336791",
      react: "#61dafb",
    };
    return colors[language] || "#8978b1ff";
  };

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: "100%",
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "#8978b1ff",
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(137, 120, 177, 0.2)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: getLanguageColor(snippet.language),
              width: 32,
              height: 32,
              mr: 2,
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {snippet.avatar}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#f8fafc", fontWeight: 600 }}
            >
              {snippet.author}
            </Typography>
            <Typography variant="caption" sx={{ color: "#cbd5e1" }}>
              {snippet.createdAt}
            </Typography>
          </Box>
          <Chip
            label={snippet.language}
            size="small"
            sx={{
              backgroundColor: getLanguageColor(snippet.language),
              color: "white",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          />
        </Box>

        {/* Title & Description */}
        <Typography
          variant="h6"
          sx={{
            color: "#f8fafc",
            fontWeight: 600,
            mb: 1,
            fontSize: "1.125rem",
          }}
        >
          {snippet.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#cbd5e1",
            mb: 2,
            lineHeight: 1.5,
          }}
        >
          {snippet.description}
        </Typography>

        {/* Code Section */}
        <Box sx={{ px: 3, pb: 2 }}>
          {isExpanded ? (
            // Full Monaco Editor
            <Box sx={{ mb: 2 }}>
              <Editor
                height="300px"
                width="780px"
                language={snippet.language}
                value={snippet.code}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 12,
                  wordWrap: "on",
                  automaticLayout: true,
                }}
              />
              <Button
                size="small"
                onClick={() => setIsExpanded(false)}
                sx={{ mt: 1, color: "#8978b1ff" }}
              >
                Show Less
              </Button>
            </Box>
          ) : (
            // Code Preview
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100vh",
                height: "300px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Monaco, Consolas, monospace",
                  color: "#e2e8f0",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  textAlign: "center",
                  maxWidth: "100vh",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "horizontal",
                }}
              >
                {snippet.code}
              </Typography>
              <Button
                size="small"
                onClick={() => setIsExpanded(true)}
                sx={{ mt: 1, color: "#8978b1ff" }}
              >
                View in code editor
              </Button>
            </Box>
          )}
        </Box>

        {/* Tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {snippet.tags.map((tag, index) => (
            <Chip
              key={index}
              label={`#${tag}`}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "#475569",
                color: "#94a3b8",
                fontSize: "0.75rem",
                "&:hover": {
                  borderColor: "#8978b1ff",
                  color: "#8978b1ff",
                },
              }}
            />
          ))}
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => setIsLiked(!isLiked)}
              sx={{ color: isLiked ? "#ef4444" : "#94a3b8" }}
            >
              {isLiked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
              {snippet.likes}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VisibilityIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
              {snippet.views}
            </Typography>
          </Box>
        </Box>

        <Button
          size="small"
          startIcon={<CodeIcon />}
          sx={{
            color: "#8978b1ff",
            "&:hover": {
              backgroundColor: "rgba(137, 120, 177, 0.1)",
            },
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
