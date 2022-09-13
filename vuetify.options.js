// import colors from 'vuetify/es5/util/colors'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

export default {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark: false,
    themes: {
      light: {
        jlMain: '#00d2c0',
      },
      dark: {
        jlMain: '#00d2c0',
      },
    }
  },
  defaultAssets:{
    icons:  'mdi' // default - only for display purposes
  },
}
