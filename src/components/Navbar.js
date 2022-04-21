import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import nexumLogo from "../assets/nexumLogo.jpg";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import "./navbar.css";
import QuestionModal from './QuestionModal';
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Link, useNavigate} from "react-router-dom";
const pages = ["Home", "Notifications", "Ask Questions"];
// const settings = ["Profile"];



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({userData}) => {
  // console.log(userData);
  const navigate = useNavigate();
  const { logout, handleOpen, searchData, handleSearchData } = useContext(AuthContext);
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login");
    // console.log("done");
  };
  return (
    <AppBar
      position="static"
      className="navbar-container"
      style={{ backgroundColor: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
          <Link to ="/">
          <img
              src={nexumLogo}
              alt="nexum"
              style={{ height: "40px", width: "150px" }}
            />
          </Link>
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img
              src={nexumLogo}
              alt="nexum"
              style={{ height: "40px", width: "150px" }}
            />
          </Typography>

          <Box
            mr={2}
            sx={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
          {/* <Link to ="/">
          <HomeIcon fontSize="large" sx={{ mx: 2, color: "black" }} />
          </Link> */}
            
            {/* <NotificationsActiveIcon
              fontSize="large"
              sx={{ mx: 2, color: "black" }}
            /> */}
            {/* <LanguageIcon fontSize="large" sx={{ mx: 2, color: "black" }} /> */}
            {/* <Search sx={{ mr: 2 }}>
              <SearchIconWrapper style={{ textAlign: "center" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                autoFocus 
              // selected="true"
                placeholder="Search…"
                type="text"
                onChange={(e)=>{handleSearchData(e.target.value)}}
                value={searchData}
                />
              
            </Search> */}
            <Button
              variant="contained"
              color="success"
              style={{ height: "50px" }}
              onClick = {()=>{handleOpen()}}
            >
              Add Question
            </Button>
          </Box>
            
            <div style={{display:'none'}}>
            
            <QuestionModal userData={userData}/>
            </div>
           
            

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userData?.photoUrl}/>
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
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
              
              <Link to="/profile" style={{ textDecoration: "none", color: "black"}}>
                  <Typography textAlign="center">Profile</Typography>
              </Link>
                </MenuItem>

              <MenuItem 
              key={"Logout"} 
              onClick={()=>{
                handleLogout();
                handleCloseUserMenu();
              }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
