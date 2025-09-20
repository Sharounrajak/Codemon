// components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Gets current route

  const isExplorePage = location.pathname === "/explore";
  const isLandingPage = location.pathname === "/";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: isExplorePage ? "#0f172a" : "transparent", // Different bg for explore
        py: 1,
        borderBottom: isExplorePage ? "1px solid #334155" : "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        {/* Logo - always clickable to home */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: isExplorePage ? "#8978b1ff" : "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          CodeMon
        </Typography>

        {/* Navigation Links - change based on page */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {isLandingPage && (
            // Landing page buttons
            <>
              <Button
                sx={{ color: "rgba(255,255,255,0.8)" }}
                onClick={() => navigate("/explore")}
              >
                Browse Projects
              </Button>
              <Button sx={{ color: "rgba(255,255,255,0.8)" }}>Community</Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                }}
              >
                Join Now
              </Button>
            </>
          )}

          {isExplorePage && (
            // Explore page buttons
            <>
              <Button sx={{ color: "#cbd5e1" }} onClick={() => navigate("/")}>
                Home
              </Button>
              <Button
                sx={{ color: "#cbd5e1" }}
                onClick={() => navigate("/create")} // Future create page
              >
                Create Snippet
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#8978b1ff",
                  "&:hover": { bgcolor: "#7c6ba5" },
                }}
                onClick={() => navigate("/mysnippet")} // Future create page
              >
                My Snippets
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
