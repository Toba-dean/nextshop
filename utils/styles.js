import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    '& a': {
      color: "#fff",
      marginLeft: 10
    }
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  grow: {
    flexGrow: 1
  },
  main: {
    minHeight: "80vh"
  },
  section: {
    marginTop: 10,
    marginBottom: 10
  },
  form: {
    maxWidth: 800,
    margin: "0 auto"
  },
  footer: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20
  },
  navbarButton: {
    color: "#fff",
    textTransform: "initial"
  },
});