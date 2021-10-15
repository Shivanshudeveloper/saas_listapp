import * as Yup from "yup";
import React, { useState, useEffect } from "react";

import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
  Radio,
  RadioGroup,
  Button,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// hooks
import useAuth from "../../../../hooks/useAuth";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../../upload";
// utils
import { fData } from "../../../../utils/formatNumber";
//
import countries from "../countries";
import { API_SERVICE } from "../../../../config";
import axios from "axios";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const userId = "123456";

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required("Name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: user.displayName || "",
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      about: user.about,
      isPublic: user.isPublic,
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar("Update success", { variant: "success" });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("photoURL", {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  const initialState = {
    host: "",
    port: "",
    tls: "false",
    username: "",
    password: "",
    userId: userId,
    emails: [],
  };
  const [formData, setFormData] = useState(initialState);

  const updateDetails = async () => {
    await axios
      .post(`${API_SERVICE}/updatedetails`, formData)
      .then((res) => getDetails())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    await axios
      .get(`${API_SERVICE}/getdetails/${userId}`)
      .then((res) => setFormData(res.data[0]))
      .catch((err) => console.log(err));
  };

  const [email, setEmail] = useState("");

  const addEmail = async () => {
    await axios
      .post(`${API_SERVICE}/adddetails/${userId}`, { email })
      .then((res) => {
        setEmail("");
        getDetails();
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps("displayName")}
                  />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Email Address"
                    {...getFieldProps("email")}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps("phoneNumber")}
                  />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps("address")}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps("country")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>
              </Stack>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">Email Settings</Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                Update your email provider settings
              </Typography>
              <TextField
                label="Host"
                fullWidth
                value={formData.host}
                onChange={(e) =>
                  setFormData({ ...formData, host: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Port"
                fullWidth
                value={formData.port}
                onChange={(e) =>
                  setFormData({ ...formData, port: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <Typography sx={{ mb: 2 }}>
                Do you want to secure using TLS
              </Typography>
              <RadioGroup
                row
                sx={{ mb: 2 }}
                value={formData.tls}
                onChange={(e) =>
                  setFormData({ ...formData, tls: e.target.value })
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              <TextField
                label="Username"
                fullWidth
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                fullWidth
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={updateDetails}>
                Update
              </Button>
              {formData?._id?.length > 0 && (
                <>
                  <Typography sx={{ mb: 2, mt: 2 }}>
                    Emails: {formData?.emails?.map((e) => `${e?.email}, `)}
                  </Typography>
                  <TextField
                    label="Add Emails"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" onClick={addEmail}>
                    Add
                  </Button>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
