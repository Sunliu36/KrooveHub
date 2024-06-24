"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

function SwitchBar() {
  const settings = ["Profile", "Settings"];
  const pathname = usePathname();
  const showNavbar = pathname !== "/";
  const PlanetIcon = () => (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32.1903 16.6682C33.734 15.008 34.4384 13.5701 34.0412 12.7183C33.6438 11.8661 32.0884 11.4815 29.8227 11.5974C30.9524 13.071 31.7738 14.7934 32.1903 16.6682ZM26.7051 8.67795C24.6427 7.30205 22.1648 6.5 19.4996 6.5C12.8059 6.5 7.29383 11.5589 6.57821 18.062C2.67784 21.4071 0.734954 24.9232 2.0089 27.6552C3.28271 30.3869 7.22446 31.1588 12.2934 30.3216C14.3559 31.6978 16.834 32.5 19.4996 32.5C26.1944 32.5 31.7072 27.4393 32.4213 20.9347C36.3191 17.5906 38.2602 14.0759 36.9867 11.3448C35.7131 8.61359 31.7726 7.84144 26.7051 8.67795ZM13.0834 26.8415C11.0401 25.0543 9.74958 22.4279 9.74958 19.5C9.74958 14.1152 14.1148 9.75 19.4996 9.75C24.8186 9.75 29.1428 14.0092 29.2476 19.3031C27.1818 20.8961 24.5572 22.5197 21.5581 23.9183C18.5603 25.3161 15.6308 26.2828 13.0834 26.8415ZM17.4546 29.0352C19.2332 28.457 21.075 27.7295 22.9316 26.8638C24.7894 25.9974 26.5316 25.0535 28.1187 24.0619C26.4819 27.148 23.2362 29.25 19.4996 29.25C18.7981 29.25 18.114 29.1759 17.4546 29.0352ZM9.17634 27.4024C6.90882 27.5189 5.35196 27.1343 4.9544 26.2817C4.55696 25.4294 5.2625 23.9902 6.80821 22.3287C7.22448 24.2047 8.04606 25.9281 9.17634 27.4024Z"
        fill="white"
      />
    </svg>
  );
  const SearchIcon = () => (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.25 29.25C9.0703 29.25 3.25 23.4297 3.25 16.25C3.25 9.0703 9.0703 3.25 16.25 3.25C23.4297 3.25 29.25 9.0703 29.25 16.25C29.25 19.2542 28.231 22.0203 26.5198 24.2217L35.274 32.976L32.976 35.274L24.2217 26.5198C22.0203 28.231 19.2542 29.25 16.25 29.25ZM26 16.25C26 21.6348 21.6348 26 16.25 26C10.8652 26 6.5 21.6348 6.5 16.25C6.5 10.8652 10.8652 6.5 16.25 6.5C21.6348 6.5 26 10.8652 26 16.25Z"
        fill="white"
      />
    </svg>
  );

  const FourCircle = () => (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5625 17.875C6.52392 17.875 3.25 14.6011 3.25 10.5625C3.25 6.52392 6.52392 3.25 10.5625 3.25C14.6011 3.25 17.875 6.52392 17.875 10.5625C17.875 14.6011 14.6011 17.875 10.5625 17.875ZM3.25 28.4375C3.25 32.4761 6.52392 35.75 10.5625 35.75C14.6011 35.75 17.875 32.4761 17.875 28.4375C17.875 24.3989 14.6011 21.125 10.5625 21.125C6.52392 21.125 3.25 24.3989 3.25 28.4375ZM21.125 28.4375C21.125 32.4761 24.3989 35.75 28.4375 35.75C32.4761 35.75 35.75 32.4761 35.75 28.4375C35.75 24.3989 32.4761 21.125 28.4375 21.125C24.3989 21.125 21.125 24.3989 21.125 28.4375ZM21.125 10.5625C21.125 14.6011 24.3989 17.875 28.4375 17.875C32.4761 17.875 35.75 14.6011 35.75 10.5625C35.75 6.52392 32.4761 3.25 28.4375 3.25C24.3989 3.25 21.125 6.52392 21.125 10.5625ZM28.4375 14.625C30.6812 14.625 32.5 12.8062 32.5 10.5625C32.5 8.31884 30.6812 6.5 28.4375 6.5C26.1938 6.5 24.375 8.31884 24.375 10.5625C24.375 12.8062 26.1938 14.625 28.4375 14.625ZM14.625 10.5625C14.625 12.8062 12.8062 14.625 10.5625 14.625C8.31884 14.625 6.5 12.8062 6.5 10.5625C6.5 8.31884 8.31884 6.5 10.5625 6.5C12.8062 6.5 14.625 8.31884 14.625 10.5625ZM28.4375 32.5C30.6812 32.5 32.5 30.6812 32.5 28.4375C32.5 26.1938 30.6812 24.375 28.4375 24.375C26.1938 24.375 24.375 26.1938 24.375 28.4375C24.375 30.6812 26.1938 32.5 28.4375 32.5ZM14.625 28.4375C14.625 30.6812 12.8062 32.5 10.5625 32.5C8.31884 32.5 6.5 30.6812 6.5 28.4375C6.5 26.1938 8.31884 24.375 10.5625 24.375C12.8062 24.375 14.625 26.1938 14.625 28.4375Z"
        fill="white"
      />
    </svg>
  );

  const InfiniteIcon = () => (
    <svg
      width="37"
      height="21"
      viewBox="0 0 37 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.5799 6.42838C20.9774 5.30865 20.3902 4.37753 19.7791 3.61536C19.9864 3.40274 20.1625 3.22489 20.2682 3.1242C22.0218 1.45411 23.7501 0.75 26.625 0.75C31.851 0.75 36.375 4.97236 36.375 10.5C36.375 16.0276 31.851 20.25 26.625 20.25C21.9897 20.25 20.0205 17.8388 17.0181 11.1668C14.5361 5.65128 13.1876 4 10.375 4C6.71727 4 3.875 7.0356 3.875 10.5C3.875 13.9793 6.69431 17 10.375 17C12.0704 17 14.0967 16.3255 15.8664 15.3706C16.4951 16.452 17.1177 17.3297 17.7798 18.0269C15.5006 19.3252 12.8305 20.25 10.375 20.25C4.84736 20.25 0.625 15.726 0.625 10.5C0.625 5.28674 4.8728 0.75 10.375 0.75C15.0103 0.75 16.9795 3.16122 19.9819 9.83316C22.4639 15.3487 23.8124 17 26.625 17C30.1043 17 33.125 14.1807 33.125 10.5C33.125 6.81931 30.1043 4 26.625 4C24.5921 4 23.6641 4.37806 22.5096 5.47765C22.3569 5.62302 21.9771 6.01559 21.5799 6.42838Z"
        fill="white"
      />
    </svg>
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (!showNavbar) {
    return null;
  }

  return (
    <div className="fixed left-0 bottom-0 z-10 flex w-full justify-center">
      <AppBar position="static">
        <Container maxWidth={false} className="bg-pink-cloud">
          <Toolbar className="flex justify-between">
            <IconButton
              color="inherit"
              aria-label="about"
              component={Link}
              href="/about"
            >
              <PlanetIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="about"
              component={Link}
              href="/groups"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="videos"
              component={Link}
              href="/videos"
            >
              <FourCircle />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="mixplayer"
              component={Link}
              href="/mixplayer"
            >
              <InfiniteIcon />
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <Avatar alt="Remy Sharp" />
                  </SignedOut>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link
                    key={setting}
                    href={`/${setting.toLowerCase()}`} // Create a lowercase version of the page name for the URL path
                    color="inherit" // Ensure it inherits the correct color
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                <MenuItem>
                  <SignedIn>
                    <SignOutButton />
                  </SignedIn>
                  <SignedOut>
                    <SignUpButton />
                  </SignedOut>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default SwitchBar;
