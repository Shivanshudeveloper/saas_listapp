// material
import { Container } from "@material-ui/core";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { BlogNewPostForm } from "../../components/_dashboard/blog";

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  return (
    <Page title="Blog: New Post | List App">
      <Container>
        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
