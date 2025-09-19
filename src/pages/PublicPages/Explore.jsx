// pages/public/ExplorePage.jsx
import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import SnippetCard from "../../components/SnippetCard";
import { FALLBACK_SNIPPETS, useDemoData } from "../../components/demoData";
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
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
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
          {FALLBACK_SNIPPETS.map((snippet) => (
            <Grid item xs={12} sm={6} lg={4} key={snippet.id}>
              <SnippetCard snippet={snippet} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
