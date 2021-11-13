import {
  Box,
  Paper,
  Grid,
  styled,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    sq: {
      position: "absolute",
      left: "10%",
      top: "30%",
    },
  })
);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#ffffff",
  background: "#371bb1",
}));

export default function Card() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.sq}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={10}>
            <Item>
              <Typography variant="h5">Product Development Intern</Typography>
              <Typography variant="h6">2 days ago</Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={10}>
            <Item>
              <Typography variant="h5">Manager -Wealth Management</Typography>
              <Typography variant="h6">1 day ago</Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={10}>
            <Item>
              <Typography variant="h5"> Developer -Asset Manager</Typography>
              <Typography variant="h6">4 days ago</Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
