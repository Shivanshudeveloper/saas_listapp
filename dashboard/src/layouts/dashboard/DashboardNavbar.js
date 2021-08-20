import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
// components
import { MHidden } from "../../components/@material-extend";
//
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    width: "97%",
  },
  [theme.breakpoints.down("lg")]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    width: "100%",
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar, onClick }) {
  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" flexDirection="column">
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}% to goal (0/100)`}</Typography>
        </Box>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }

  return (
    <RootStyle>
      <ToolbarStyle>
        {/* <MHidden width="lgUp">
          <IconButton onClick={onClick} sx={{ mr: 1, color: "text.primary" }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
        <MHidden width="lgDown">
          <IconButton onClick={onClick} sx={{ mr: 1, color: "text.primary" }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden> */}

        <MHidden width="lgUp">
          <IconButton
            onClick={onClick}
            sx={{ mx: "auto", color: "text.primary" }}
          >
            <ExpandLessRoundedIcon style={{ transform: "rotate(90deg)" }} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LinearProgressWithLabel
            value="0"
            style={{ marginRight: "10px", width: "150px" }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px", height: "40px" }}
            size="small"
          >
            Upgrade to Unlimited
          </Button>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
