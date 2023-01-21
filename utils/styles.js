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
  footer: {
    textAlign: "center"
  }
});