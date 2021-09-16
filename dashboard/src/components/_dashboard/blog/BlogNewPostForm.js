import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  Container,
    MenuItem,
} from '@material-ui/core';



// utils
import fakeRequest from '../../../utils/fakeRequest';
//
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    // title: Yup.string().required('Title is required'),
    // description: Yup.string().required('Description is required'),
    // content: Yup.string().min(1000).required('Content is required'),
    
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      cover: null,
      tags: ['Logan'],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ['Logan'],
      formData: {},

    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
        console.log("THese are the posted values",values);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;




// Add Contact Form
const initialState = {
  fName: "",
  lName: "",
  company: "",
  email: "",
  emailType: "",
  title: "",
  phone: "",
  extn: "",
  phoneType: "",
  stage: "",
  street: "",
  city: "",
  state: "",
  country: "",
  code: "",
  linkedin: "",
  facebook: "",
  owner: "",
  tags: "",
};
const [formData, setFormData] = useState(initialState);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log("this is the form data" , formData);
};

  const GridContact = ({ label, name }) => {
    return (
      <Grid item md={6}>
        <TextField
          style={{ marginTop: "5px" }}
          label={label}
          
          size="small"
          fullWidth
          name={name}
          onChange={handleChange}
          value={formData.name}
          
        />
      </Grid>
    );
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  

                 

                  
                  <Container maxWidth="md">
                <Grid container spacing={2}>
                  {/* <GridContact label="First Name" name="fName" /> */}
                  {GridContact({ label: "First Name", name: "fName" })}
                  {GridContact({ label: "Last Name", name: "lName" })}
                  {GridContact({ label: "Company", name: "company" })}
                  {GridContact({ label: "Email", name: "email" })}
                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      
                      style={{ marginTop: "5px" }}
                    >
                      <InputLabel>Email Type</InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        name="emailType"
                        value={formData.emailType}                        
                      >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {GridContact({ label: "Title", name: "title" })}
                  {GridContact({ label: "Phone", name: "phone" })}
                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      
                      style={{ marginTop: "5px" }}
                    >
                      <InputLabel>Phone Type</InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        name="phoneType"
                        value={formData.phoneType}
                      >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Home">Home</MenuItem>
                        <MenuItem value="Mobile">Mobile</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {GridContact({ label: "Extn", name: "extn" })}
                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      
                      style={{ marginTop: "5px" }}
                    >
                      <InputLabel>Stage</InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        name="stage"
                        value={formData.stage}
                      >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Cold">Cold</MenuItem>
                        <MenuItem value="Bad Contact Info">
                          Bad Contact Info
                        </MenuItem>
                        <MenuItem value="Replied">Replied</MenuItem>
                        <MenuItem value="Unresponsive">Unresponsive</MenuItem>
                        <MenuItem value="Interested">Interested</MenuItem>
                        <MenuItem value="Not Interested">
                          Not Interested
                        </MenuItem>
                        <MenuItem value="Do Not Contact">
                          Do Not Contact
                        </MenuItem>
                        <MenuItem value="Opt-Out">Opt-Out</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {GridContact({ label: "Street Address", name: "street" })}
                  {GridContact({ label: "City", name: "city" })}
                  {GridContact({ label: "State/Region", name: "state" })}
                  {GridContact({ label: "Country", name: "country" })}
                  {GridContact({ label: "Postal Code", name: "code" })}
                  {GridContact({ label: "Linkedin", name: "linkedin" })}
                  {GridContact({ label: "Facebook", name: "facebook" })}
                  {GridContact({
                    label: "Contact Owner (Users from the System)",
                    name: "owner",
                  })}
                  {GridContact({ label: "Tags", name: "tags" })}
                  </Grid>
                </Container>
                  

                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  />

                  <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps('metaDescription')}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('metaKeywords', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Meta keywords" />}
                  />
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Post
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} />
    </>
  );
}