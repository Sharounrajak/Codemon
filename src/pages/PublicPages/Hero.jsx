// HomePage.jsx
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function Hero() {

  // In any component, add this button temporarily
const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/snippets');
    const data = await response.json();
    console.log('API Response:', data);
  } catch (error) {
    console.log('Error:', error);
  }
};
  return (
      <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="testimonial"
        >  
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(to bottom, #706096 10%, #535d85ff 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          py: { xs: 8, md: 12 },
          px: { xs: 4, md: 8 },
          position: 'relative',
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
          "Stop building portfolios.
          <br />
          Start building connections"
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
          Stop spending weeks building portfolio sites. 
          <br/>
          Upload your projects in minutes 
          <br/>and get discovered by the tech community that matters
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
            component={Link}
            to="/cta-section"
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
            Get Your DevBoard
          </Button>
          
          <Button
            component={Link}
            to="/login"
            variant="outlined"
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
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "#e8eeedff",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Login Now
          </Button>
        </Box>
      </Box>
      

     <Button onClick={testAPI}>Test API</Button>
    </Box>
    </motion.div>
  );
}