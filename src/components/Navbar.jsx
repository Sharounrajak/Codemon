// Professional Navbar.jsx
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(135deg, #38393bff 0%, #454349ff 100%)",
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',

 
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.5px',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(0.5, 1.5),
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:focus-within': {
    borderColor: '#ffffff',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
  },
}));

const SearchInput = styled('input')(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 500,
  fontSize: '0.95rem',
  padding: theme.spacing(0.5),
  minWidth: '200px',
  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '150px',
  },
}));

const FilterButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.1)',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '0.95rem',
  padding: theme.spacing(1, 3),
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&::before': {
      left: '100%',
    },
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #432b7aff, #2d48ccff)',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '0.95rem',
  padding: theme.spacing(1, 3),
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  boxShadow: '0 4px 20px rgba(67, 43, 122, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 8px 30px rgba(67, 43, 122, 0.4)',
    '&::before': {
      left: '100%',
    },
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.1)',
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
    backdropFilter: 'blur(20px)',
    border: 'none',
    padding: theme.spacing(2),
  },
}));

const MobileNavItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  margin: theme.spacing(0.5, 0),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(67, 43, 122, 0.08)',
    transform: 'translateX(8px)',
  },
}));

const MobileSearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  border: '1px solid rgba(67, 43, 122, 0.3)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(0.5, 1.5),
  backgroundColor: 'rgba(67, 43, 122, 0.05)',
  marginBottom: theme.spacing(2),
}));

const MobileSearchInput = styled('input')(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#432b7aff',
  fontWeight: 500,
  fontSize: '0.95rem',
  padding: theme.spacing(0.5),
  flex: 1,
  '&::placeholder': {
    color: 'rgba(67, 43, 122, 0.6)',
  },
}));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const mobileMenu = (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Logo>
          <CodeIcon sx={{ fontSize: 28, color: '#432b7aff' }} />
          <LogoText sx={{ color: '#432b7aff' }}>Codemon</LogoText>
        </Logo>
        <IconButton onClick={handleDrawerToggle} sx={{ color: '#432b7aff' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Mobile Search Bar */}
      <MobileSearchContainer>
        <SearchIcon sx={{ color: '#432b7aff' }} />
        <MobileSearchInput 
          placeholder="Search..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FilterButton sx={{ color: '#432b7aff', padding: '4px' }}>
          <FilterListIcon fontSize="small" />
        </FilterButton>
      </MobileSearchContainer>

      <List>
        <ListItem sx={{ mt: 2, gap: 1, flexDirection: 'column' }}>
          <SignupButton fullWidth>
            Sign up
          </SignupButton>
          <CTAButton fullWidth sx={{ mt: 1 }}>
            Login 
          </CTAButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 0, minHeight: '80px' }}>
            <Logo>
              <CodeIcon sx={{ 
                fontSize: 32, 
                color: '#ffffff',
                transition: 'color 0.3s ease' 
              }} />

              <LogoText component={Link} to="/" sx={{ color: '#ffffff', transition: 'color 0.3s ease' }}>Codemon</LogoText>
            </Logo>

            {/* Desktop Search Bar */}
            {!isMobile && (
              <SearchContainer>
                <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                <SearchInput 
                  placeholder="Search codes snippets..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <FilterButton>
                  <FilterListIcon fontSize="small" />
                </FilterButton>
              </SearchContainer>
            )}

            {!isMobile ? (
              <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 'auto' }}>
                <SignupButton>
                  Sign up
                </SignupButton>
                <CTAButton>
                  Login 
                </CTAButton>
              </Grid>
            ) : (
              <MobileMenuButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </MobileMenuButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {mobileMenu}
      </StyledDrawer>

      {/* Spacer to prevent content overlap */}
      <Toolbar sx={{ minHeight: '80px' }} />
    </>
  );
}