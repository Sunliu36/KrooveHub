"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import NoticeIcon from "@mui/icons-material/NotificationsOutlined";
// import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// const pages = ["About", "Groups", "Videos", "MixPlayer"];

function NavBar() {
  const pathname = usePathname();
  const showNavbar = pathname !== "/";
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null,
  // );

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  if (!showNavbar) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-black">
      <AppBar position="static" sx={{ background: "transparent" }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/main"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              KROOVE <br /> HUB
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/main"
              sx={{
                margin: "8px",
                marginTop: "20px",
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                lineHeight: 1.2,
              }}
            >
              KROOVE
              <br />
              HUB
            </Typography>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="notifications"
                // onClick={handleOpenNavMenu}
                color="inherit"
              >
                <NoticeIcon sx={{ fontSize: 30 }} />
              </IconButton>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={`/${page.toLowerCase()}`} // Create a lowercase version of the page name for the URL path
                    color="inherit" // Ensure it inherits the correct color
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu> */}
            </Box>
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href={`/${page.toLowerCase()}`}
                >
                  {page}
                </Button>
              ))}
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default NavBar;
