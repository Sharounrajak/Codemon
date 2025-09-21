// pages/public/ExplorePage.jsx
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import SnippetCard from "../../components/SnippetCard";
import {DEMO_SNIPPETS, FALLBACK_SNIPPETS, useDemoData } from "../../components/demoData";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
export default function ExplorePage() {
  const { snippets } = useDemoData();
  const drawerWidth = 200;

  const [snippet, setSnippet] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/api/snippets")
      .then((response) => response.json())
      .then((data) => {
        setSnippet(data);
      });
  }, []);

  function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };

    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };

    const container =
      window !== undefined ? () => window().document.body : undefined;
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
        
        
        <Divider />
        <List>
          {["My Snippets", "Create Snippet"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Typography
          variant="h3"
          sx={{
            color: "#f8fafc",
            fontWeight: 700,
            mb: 4,
            textAlign: "center",
          }}
        >
          Discover Code Snippets
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {snippets.map((snippet) => (
            <Grid item key={snippet.id} xs={12} sm={6} md={4}>
              <SnippetCard snippet={snippet} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
