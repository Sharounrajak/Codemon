// HERO SECTION WITH "DISCOVER AND SHARE CODE SNIPPET"
// FEED/GRID OF POPULAR SNIPPETS(LIKE GITHUB EXPLORER PAGE)
// SEARCH PROPMTLY DISPLAYED
// CATEGORIES : "JAVA SCRIPTS, PYTHON, REACT HOOKS, CSS TRICKS"
// SIGN UP TO SAVE AND SHARE CTA

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPages() {

  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(null);
  const [loadingText, setLoadingText] = useState("");

  const loadingMessages = [
    "Preparing your workspace...",
    "Loading code snippets...",
    "Almost ready...",
    "Welcome to CodeMon!"
  ];

  const handleGetStarted = async () => {
    setLoadingState("loading");
    
    // Cycle through loading messages
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingText(loadingMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    navigate("/explore");
    setLoadingState(null);
  };

  return (
    <>
      {/* Loading Overlay */}
      {loadingState === "loading" && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: "linear-gradient(to bottom, #464449ff 10%, #4d505eff 100%)",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            color: 'white'
          }}
        >
          <CircularProgress 
            sx={{ 
              color: '#8978b1ff',
              mb: 3
            }} 
            size={60}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              background: "linear-gradient(to top, #8978b1ff, #cfd1dbff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: { xs: "1rem", md: "1.25rem" },
              textAlign: "center"
            }}
          >
            {loadingText}
          </Typography>
        </Box>
      )}

      {/* Main Landing Page */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="testimonial"
      >
        <Box sx={{ width: "100%" }}>
         
        
    
          {/* Hero Section */}
          <Box
            sx={{
              minHeight: "100vh",
              background:
                "linear-gradient(to bottom, #464449ff 10%, #4d505eff 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              py: { xs: 8, md: 12 },
              px: { xs: 4, md: 8 },
              position: "relative",
            }}
          >
            {/* Hero Text */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontFamily: "sans-serif",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(to top, #8978b1ff, #cfd1dbff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
              }}
            >
              "STOP SCROLLING
              <br />
              START CODING",
              <br />
              CODEMON gives you the snippets you need
              <br />
              IN SECONDS
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: "sans-serif",
                fontSize: { xs: "1.125rem", md: "1.5rem" },
                mb: 4,
                background: "linear-gradient(to top, #d1ccdbff, #cfd1dbff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.4,
                maxWidth: "600px",
              }}
            >
              Don't waste time scrolling through endless code snippets. CodeMon gives you the snippets you need
              <br />
              click the button below to get started and start coding.
            </Typography>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: { xs: "column", sm: "row" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Button
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  color: "#e8eeedff",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: 600,
                  minWidth: "200px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Sign up
              </Button>

              <Button
                variant="text"
                onClick={handleGetStarted}
                disabled={loadingState === "loading"}
                sx={{
                  borderColor: "#e8eeedff",
                  color: "#e8eeedff",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: 600,
                  minWidth: "200px",
                  borderWidth: 2,
                  border: "2px solid #e8eeedff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "#e8eeedff",
                    transform: loadingState === "loading" ? "none" : "translateY(-2px)",
                  },
                  "&:disabled": {
                    color: "rgba(232, 238, 237, 0.5)",
                    borderColor: "rgba(232, 238, 237, 0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loadingState === "loading" ? (
                  <>
                    <CircularProgress size={18} sx={{ color: "#e8eeedff", mr: 1 }} />
                    Loading...
                  </>
                ) : (
                  <>
                    Get started for free
                    <ArrowForwardOutlinedIcon sx={{ ml: 1 }} />
                  </>
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}