import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { white, black, grey600 } from 'material-ui/styles/colors'

export const theme = getMuiTheme({
  palette: {
    primary1Color: black,
    textColor: white,
    disabledColor: grey600,
  },
  button: {
    // textTransform: 'none',
  },
  slider: {
    trackSize: 4,
    trackColor: white,
    trackColorSelected: white,
    handleSize: 14,
    handleSizeActive: 20,
    handleColorZero: white,
    handleFillColor: white,
    selectionColor: white,
    rippleColor: white,
  },
})

