// Footer.js
import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Footer = () => {
    return (
        <footer style={{ marginTop: 'auto', backgroundColor: '#f5f5f5', padding: '10px 0' }}>
            <Container>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body2" color="textSecondary" align="center">
                            &copy; {new Date().getFullYear()} GreenLink(pvt)Limited . All Rights Reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
