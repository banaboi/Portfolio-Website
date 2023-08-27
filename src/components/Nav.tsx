import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// @ts-ignore
import luke from "../assets/profile.png";
import { createTheme, ThemeProvider, useScrollTrigger } from "@mui/material";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: "#363636",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
          fontFamily: "JetBrains Mono",
          color: "lime",
        },
      },
    },
  },
});

const pages = [
  { name: "About me", link: "#aboutMe" },
  { name: "Projects", link: "#projectsSection" },
  { name: "Skills", link: "#skills" },
  { name: "Contact me", link: "#contact" },
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleLukeClick = (event: React.MouseEvent<HTMLElement>) => {
    window.scrollTo(0, 0);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function ElevationScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <ElevationScroll>
          <AppBar
            position="fixed"
            style={{
              color: "white",
              backgroundColor: "#363636",
              opacity: "99%",
            }}
          >
            <Container id="nav" maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Use the force">
                    <IconButton
                      onClick={handleLukeClick}
                      sx={{
                        pl: 2,
                      }}
                    >
                      <Avatar alt="Luke" src={luke} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    flexGrow: 0,
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                >
                  {pages.map((page, index) => (
                    <Button
                      key={index}
                      onClick={handleCloseNavMenu}
                      href={page.link}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                      }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    className="submenu-nav"
                    anchorEl={anchorRef.current}
                    keepMounted
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Box className="sub-menu-nav">
                      {pages.map((page, index) => (
                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                          <Button href={page.link}>
                            <p
                              style={{
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              {page.name}
                            </p>
                          </Button>
                        </MenuItem>
                      ))}
                    </Box>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </ElevationScroll>
      </React.Fragment>
    </ThemeProvider>
  );
};
export default Nav;
