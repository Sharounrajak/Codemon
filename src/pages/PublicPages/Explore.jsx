// pages/public/ExplorePage.jsx
import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box 
} from '@mui/material';
import SnippetCard from '../../components/SnippetCard';
import { FALLBACK_SNIPPETS, useDemoData } from '../../components/demoData';
export default function ExplorePage() {
  const {snippets} = useDemoData();
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      py: 4,
     
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#f8fafc',
            fontWeight: 700, 
            mb: 4,
            textAlign: 'center'
          }}
        >
          Discover Code Snippets
        </Typography>

        <Grid container spacing={3} sx={{display: 'flex', justifyContent: 'center'}}>
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