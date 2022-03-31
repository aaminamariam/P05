import  React from "react";
import {createTheme} from '@material-ui/core/styles';
//import {ThemeProvider} from "@material-ui/core";
//import theme from "../../components/theme";
//<ThemeProvider theme={theme}>

const theme = createTheme({
  typography: {
    h5: {
     fontFamily: '"Montserrat", Open Sans',
     fontSize: 16,
     color:'pink',
    },
    h6: {
      fontFamily: '"Montserrat", Open Sans',
      fontSize: 12,
      color:'pink',
     }

  },

    palette: {
  
      primary: {
  
        main: "#371BB1",
  
      },
  
      secondary: {
  
        main:  "#46b988",
  
        contrastText: "#371BB1",
  
      },
  
    },
  
  });
  
  
  
  
  theme.props = {
  
    MuiButton: { // `MuiButton` is the global class name for the <Button /> component
  
      disableElevation: true, // this prop disables the drop shadow on all Buttons
  
    },
    MuiInputLabel: {

      shrink: true, 
  
    },
  
    MuiInput: {
  
      disableUnderline: true, 
  
    }


  
  };
  theme.overrides = {

    MuiButton: {
  
      root: {
  
        borderRadius: 0, // square corners
  
        textTransform: 'none', // removes uppercase transformation
  
      },
  
      containedPrimary: {
  
        '&:hover': { // changes colors for hover state
  
          backgroundColor: "#46b988",
  
          color: 'white',
  
        },
  
      },
  
      containedSecondary: {
  
        fontWeight: 700, // makes text bold
  
      },
  
    },
    MuiInputLabel: {

      root: {
  
        textTransform: 'uppercase',
  
        fontSize: '1.5rem',
  
      },
  
    },
  
    MuiInput: {
  
      root: {
  
        top: theme.spacing(2),
  
        border: '1px solid #371BB1',
  
        outline:'1px solid transparent',
  
        padding: theme.spacing(1),
  
    
  
      },
  
      
  
    },
  
  };
export default theme;