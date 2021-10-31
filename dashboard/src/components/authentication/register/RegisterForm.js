import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import closeFill from "@iconify/icons-eva/close-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
//
import { MIconButton } from "../../@material-extend";
import { auth, storage, firestore } from "../../../Firebase/index";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const initialState = { fName: "", lName: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then((result) => {
        var user = result.user;
        user
          .updateProfile({
            displayName: `${formData.fName} ${formData.lName}`,
          })
          .then(async () => {
            sessionStorage.setItem("userId", user.uid);
            sessionStorage.setItem("userEmail", user.email);
            sessionStorage.setItem("userName", user.displayName);
            setFormData(initialState);
            navigate("/dashboard", { replace: true });
          })
          .catch((err) => console.log(err));
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="First name"
            value={formData.fName}
            onChange={(e) =>
              setFormData({ ...formData, fName: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Last name"
            value={formData.lName}
            onChange={(e) =>
              setFormData({ ...formData, lName: e.target.value })
            }
          />
        </Stack>

        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // component={Link}
          // to="/pricing"
          onClick={handleRegister}
        >
          Register
        </LoadingButton>
      </Stack>
    </>
  );
}
