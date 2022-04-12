import { createTheme } from '@mui/material/styles';

const customBlue = "#3f72af"
const customWhite = "#F9F7F7"
const darkBlue = "#112D4E"

export default createTheme({
    palette: {
        background:{
            default : `${customBlue}`
        },
        common :{
            blue : `${customBlue}`,
            white : `${customWhite}`
        },
        primary: {
            main : `${customBlue}`,
            dark : `${darkBlue}`
        },
        secondary: {
            main : `${customWhite}`
        },
    },
    typography: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        h1 :{
            fontWeight : 700
        },
        h2 :{
            fontWeight : 500
        },
        h3 :{
            fontWeight : 400
        },
        h4 :{
            fontWeight : 300
        },
    }
  });

// export default ThemeProvider({
    // palette: {
    //     background:{
    //         default : `${customBlue}`
    //     },
    //     common :{
    //         blue : `${customBlue}`,
    //         white : `${customWhite}`
    //     },
    //     primary: {
    //         main : `${customBlue}`,
    //         dark : `${darkBlue}`
    //     },
    //     secondary: {
    //         main : `${customWhite}`
    //     },
    // },
    // typography: {
    //     fontFamily: ['Rubik', 'sans-serif'].join(','),
    //     h1 :{
    //         fontWeight : 700
    //     },
    //     h2 :{
    //         fontWeight : 500
    //     },
    //     h3 :{
    //         fontWeight : 400
    //     },
    //     h4 :{
    //         fontWeight : 300
    //     },
    // }
// });