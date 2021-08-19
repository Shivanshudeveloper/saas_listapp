import PropTypes from "prop-types";
// material
import { useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import logo from "../images/logo.jpg";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: "0 auto",
        width: 40,
        height: 40,
        ...sx,
        marginLeft: "15px",
      }}
    >
      <img src={logo} alt="logo" />
    </Box>
  );
}
