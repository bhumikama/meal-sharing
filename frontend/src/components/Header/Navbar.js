"use client";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:740px)");
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const navLinkItems = [
    { name: "Home", url: "/" },
    { name: "Meals", url: "/meals" },
    { name: "About Us", url: "/about" },
  ];

  const drawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: "#f7f9fc",
        },
      }}
    >
      <List>
        {navLinkItems.map((item) => (
          <ListItem
            button
            key={item.name}
            onClick={handleDrawerToggle}
            sx={{
              "&:hover": { backgroundColor: "#e0f7fa" },
              backgroundColor: pathname === item.url ? "#e0f7fa" : "inherit",
            }}
          >
            <Link href={item.url} passHref>
              <ListItemText primary={item.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#29ade5", padding: "0 1rem" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1.4rem",
            fontWeight: "500",
            color: "#fff",
            textTransform: "none",
            "&:hover": { textDecoration: "none" },
          }}
        >
          <DinnerDiningIcon
            sx={{
              fontSize: "1.7rem",
              marginRight: "8px",
              color: "white",
            }}
          />
          <Link href={"/"} style={{ color: "inherit", textDecoration: "none" }}>
            MealShare
          </Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            {drawer}
          </>
        ) : (
          navLinkItems.map((link) => (
            <Link href={link.url} passHref key={link.name}>
              <Button
                color="inherit"
                sx={{
                  marginX: 1,
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  fontWeight: pathname === link.url ? "bold" : "normal",
                  borderBottom:
                    pathname === link.url ? "2px solid white" : "none",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                {link.name}
              </Button>
            </Link>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
