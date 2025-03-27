import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    // Toggle Mobile Menu
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Navbar Items
    const navItems = [
        { label: "Home", path: "/" },
        { label: "My Crops", path: "/my-crops" },
        { label: "About Us", path: "/about-us" },
        { label: "Help", path: "/help" },
    ];

    return (
        <>
            {/* Desktop Header */}
            <AppBar position="static" sx={{ background: "linear-gradient(90deg, #316b41 30%, #f1873a 90%)" }}>
                <Toolbar>
                    {/* Logo */}
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}>
                        GreenLink
                    </Typography>

                    {/* Desktop Menu */}
                    <div className="desktop-menu">
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                to={item.path}
                                sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                    marginX: 1,
                                    "&:hover": { backgroundColor: "#f1873a", borderRadius: 1 },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <IconButton edge="end" color="inherit" onClick={handleDrawerToggle} sx={{ display: { md: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                <List sx={{ width: 200, backgroundColor: "#316b41", height: "100%" }}>
                    {navItems.map((item) => (
                        <ListItem button key={item.label} component={Link} to={item.path} onClick={handleDrawerToggle}>
                            <ListItemText
                                primary={item.label}
                                sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Header;
