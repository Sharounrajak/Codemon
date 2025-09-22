// pages/public/ExplorePage.jsx
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import SnippetCard from "../../components/SnippetCard";
import {DEMO_SNIPPETS, FALLBACK_SNIPPETS, useDemoData } from "../../components/demoData";
import { Link } from "react-router-dom";
import CodeIcon from '@mui/icons-material/Code';
import MailIcon from "@mui/icons-material/Mail";
import { AppBar, CssBaseline, Drawer } from "@mui/material";
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
  
  const [snippet, setSnippet] = useState();
  
  useEffect(() => {
    fetch("http://localhost:5000/api/snippets")
    .then((response) => response.json())
    .then((data) => {
      setSnippet(data);
    });
  }, []);
  
  const drawerWidth = 200;
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

      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,  backgroundColor: "#0f172a",
        color: "#8978b1ff",}}
      >
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
             backgroundColor: "#0f172a",
             color: "#8978b1ff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
       
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <CodeIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
   
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <CodeIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box  
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
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
