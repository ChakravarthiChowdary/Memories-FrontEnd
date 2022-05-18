import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useWindowSize from "../hooks/useWindowSize";
import { Zoom } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SEARCH_POSTS } from "../store/actions/postsActions";
import { AUTH_SIGNOUT } from "../store/actions/authActions";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar(props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    setSearchText("");
  }, [location.pathname]);

  const navigate = useNavigate();
  const size = useWindowSize();

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClick = (path: string) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const searchChangedHandler = (event: any) => {
    dispatch({
      type: SEARCH_POSTS,
      payload: {
        location: location.pathname,
        searchText: event.target.value,
      },
    });
    setSearchText(event.target.value);
  };

  const myPostsClickedHandler = () => {
    navigate("/myPosts");
    handleMenuClose();
  };

  const myProfileClickedHandler = () => {
    navigate("/myProfile");
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={myPostsClickedHandler}>My Posts</MenuItem>
      <MenuItem onClick={myProfileClickedHandler}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/", { replace: true });
          handleMenuClose();
          dispatch({ type: AUTH_SIGNOUT });
        }}
      >
        Sign Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <>
          {" "}
          <MenuItem onClick={() => handleMobileMenuClick("/")}>
            <IconButton size="large" color="inherit">
              <HomeIcon />
            </IconButton>
            <p>Home</p>
          </MenuItem>
          {size.width && size.width <= 900 && (
            <MenuItem onClick={() => handleMobileMenuClick("/addnewmemory")}>
              <IconButton size="large" color="inherit">
                <Badge color="error">
                  <NoteAltIcon />
                </Badge>
              </IconButton>
              <p>Post Memory</p>
            </MenuItem>
          )}
          <MenuItem onClick={() => handleMobileMenuClick("/likedmemories")}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="error">
                <ThumbUpIcon />
              </Badge>
            </IconButton>
            <p>Liked Memories</p>
          </MenuItem>
          <MenuItem onClick={() => handleMobileMenuClick("/favourites")}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <p>Favourites</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </>
      ) : (
        <>
          {" "}
          <MenuItem onClick={() => handleMobileMenuClick("/")}>
            <IconButton size="large" color="inherit">
              <Badge color="error">
                <LockOpenIcon />
              </Badge>
            </IconButton>
            <p>Sign In</p>
          </MenuItem>
          <MenuItem onClick={() => handleMobileMenuClick("/signup")}>
            <IconButton size="large" color="inherit">
              <HowToRegIcon />
            </IconButton>
            <p>Sign Up</p>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar id="back-to-top-anchor">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontFamily: "poppins" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/7070/7070926.png"
              alt="Girl in a jacket"
              className="navbar_app_logo"
            />{" "}
            Memories
          </Typography>
          {user && (
            <Search sx={{ flexGrow: 1, fontFamily: "poppins" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ fontFamily: "poppins" }}
                onChange={searchChangedHandler}
                value={searchText}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => navigate("/", { replace: true })}
                >
                  <Badge color="error">
                    <HomeIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => navigate("/likedmemories")}
                >
                  <Badge color="error">
                    <ThumbUpIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => navigate("/favourites")}
                >
                  <Badge color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => navigate("/", { replace: true })}
                >
                  <LockOpenIcon />
                </IconButton>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => navigate("/signup", { replace: true })}
                >
                  <HowToRegIcon />
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
      <ScrollTop {...props}>
        <Fab color="error" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
