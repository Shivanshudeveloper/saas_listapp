import Page from "../../components/Page";
import {
  Box,
  Typography,
  Button,
  Divider,
  Container,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddIcon from "@material-ui/icons/Add";

export default function GeneralEcommerce() {
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

  const Highlight = ({ text }) => {
    return <span style={{ color: "blue", padding: "0 5px" }}>{text}</span>;
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Page title="Companies | List App">
      <Container maxWidth="xl">
        <Box
          style={{
            margin: "30px auto",
            marginTop: "0px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Typography variant="h4">My Companies</Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="flex-end" marginTop={5}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: "10px" }}
            startIcon={<AddIcon />}
          >
            Import Companies
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          maxWidth="48%"
          margin="0 auto"
        >
          {/* eslint-disable-next-line */}
          <img
            src={`/static/icons/navbar/company.svg`}
            alt="company-image"
            height="100"
          />
          <Typography variant="h6">
            You don't have any companies yet!!
          </Typography>
          <Typography variant="body1">
            Use the search bar on the left to easily find contacts or companies
            for your targets, or simply click one of our search starters below
            and see how Seamless.AI works!
          </Typography>

          <List component="nav" style={{ marginTop: "30px" }}>
            <ListItemLink
              href="#"
              style={{
                textAlign: "center",
                border: "1px solid #dddddd",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemText>
                Show me <Highlight text="Accounting" /> companies in
                <Highlight text="New York" />
              </ListItemText>
            </ListItemLink>
            <ListItemLink
              href="#"
              style={{
                textAlign: "center",
                border: "1px solid #dddddd",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemText>
                Show me companies in <Highlight text="Computer Software" /> with
                <Highlight text="500+ employees" />
                in the
                <Highlight text="US" />
              </ListItemText>
            </ListItemLink>
            <ListItemLink
              href="#"
              style={{
                textAlign: "center",
                border: "1px solid #dddddd",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemText>
                Show me <Highlight text="Internet" /> companies with
                <Highlight text="10,000+ employees" /> in the
                <Highlight text="US" />
              </ListItemText>
            </ListItemLink>
          </List>
        </Box>
      </Container>
    </Page>
  );
}
