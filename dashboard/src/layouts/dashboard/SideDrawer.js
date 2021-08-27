import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Logo from "../../components/Logo";
import MyAvatar from "../../components/MyAvatar";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Toolbar } from "@material-ui/core";
import sidebarConfig from "./SidebarConfig";
import { PATH_DASHBOARD } from "../../routes/paths";
import NavSection from "../../components/NavSection";
import DashboardNavbar from "./DashboardNavbar";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import { MHidden } from "../../components/@material-extend";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    zIndex: "1201",
  },
  drawerOpen: {
    width: drawerWidth,
    overflowY: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    overflowY: "hidden",
    // width: theme.spacing(7) + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 1,
    // },
    width: "60px",
    [theme.breakpoints.down("md")]: {
      width: 0,
    },
  },
  toolbar: {
    position: "absolute",
    top: "5%",
    left: "185px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    zIndex: "1200",
    "& :hover": {
      background: "whitesmoke",
    },

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeButton: {
    border: "1px solid rgba(145, 158, 171, 0.24)",
    borderRadius: "10px",
    background: "white",
    "& :hover": {
      background: "whitesmoke",
    },
  },
}));

export default function SideDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <DashboardNavbar onClick={handleDrawerOpen} />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <MHidden width="lgDown">
          <Box
            sx={{
              pt: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {!open && (
              <>
                <Box
                  component={RouterLink}
                  to="/"
                  sx={{ display: "inline-flex", alignItems: "center" }}
                >
                  <Logo />
                </Box>
                <IconButton
                  onClick={handleDrawerOpen}
                  sx={{ mx: "auto", color: "text.primary" }}
                >
                  <ExpandLessRoundedIcon
                    style={{ transform: "rotate(90deg)" }}
                  />
                </IconButton>
              </>
            )}
          </Box>
        </MHidden>

        {open && (
          <>
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: "inline-flex", alignItems: "center" }}
            >
              <Logo />
            </Box>
          </>
        )}

        <NavSection navConfig={sidebarConfig} />

        <Box sx={{ flexGrow: 1 }} />
      </Drawer>
      {open && (
        <>
          <div className={classes.toolbar}>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ p: 1 }}
              className={classes.closeButton}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
