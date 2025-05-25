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
import luke from "../assets/profile.png";
import lukeLightMode from "../assets/profile_lightmode.png";
import { createTheme, ThemeProvider, useScrollTrigger } from "@mui/material";
import { useTheme } from "../hooks/useTheme";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "var(--bg-secondary)",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--border-color)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontFamily: "Orbitron, Space Mono, JetBrains Mono",
          color: "var(--accent-primary)",
          textShadow: "0 0 10px var(--shadow-color)",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "var(--accent-secondary)",
            textShadow: "0 0 15px var(--shadow-color)",
            transform: "scale(1.05)",
          },
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
  const { theme: currentTheme, toggleTheme } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };  const handleLukeClick = (_event: React.MouseEvent<HTMLElement>) => {
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
              color: "var(--text-primary)",
              background: "var(--bg-secondary)",
              backdropFilter: "blur(15px)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 0 20px var(--shadow-color)",
              transition: "all 0.3s ease",
            }}
          >
            <Container id="nav" maxWidth="xl">
              <Toolbar disableGutters>
                {/* Logo - Left side */}
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Luke Banicevic - Software Engineer">
                    <IconButton
                      onClick={handleLukeClick}
                      sx={{
                        pl: 2,
                      }}
                    >
                      <Avatar
                        alt="Luke"
                        src={currentTheme === 'light' ? lukeLightMode : luke}
                        sx={{
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Spacer to push items to the right */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Desktop Navigation - Right side */}
                <Box
                  sx={{
                    flexGrow: 0,
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: 1,
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

                  {/* Theme Toggle for Desktop */}
                  <Tooltip
                    title={currentTheme === 'light' ? 'Switch to Dark Side' : 'Join the Light Side'}
                    arrow
                  >
                    <IconButton
                      onClick={toggleTheme}
                      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
                      sx={{
                        ml: 1,
                        width: '48px',
                        height: '48px',
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          background: 'transparent',
                        }
                      }}
                    >
                      <div
                        style={{
                          fontSize: '20px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {currentTheme === 'light' ? '🌙' : '☀️'}
                      </div>
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Mobile Navigation - Right side */}
                <Box
                  sx={{
                    flexGrow: 0,
                    display: { xs: "flex", md: "none" },
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {/* Theme Toggle for Mobile */}
                  <Tooltip
                    title={currentTheme === 'light' ? 'Switch to Dark Side' : 'Join the Light Side'}
                    arrow
                  >
                    <IconButton
                      onClick={toggleTheme}
                      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
                      sx={{
                        width: '40px',
                        height: '40px',
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          background: 'transparent',
                        }
                      }}
                    >
                      <div
                        style={{
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {currentTheme === 'light' ? '🌙' : '☀️'}
                      </div>
                    </IconButton>
                  </Tooltip>

                  {/* Hamburger Menu */}
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
