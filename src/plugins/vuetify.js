/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/settings.scss'; // Import your settings

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        primary: 'hsl(209, 23%, 22%)',
        secondary: 'hsl(0, 0%, 52%)',
        background: '#FAFAFA',
        surface: 'hsl(0, 0%, 100%)',
        error: 'hsl(0, 100%, 50%)',
        info: 'hsl(200, 100%, 50%)',
        success: 'hsl(120, 100%, 40%)',
        warning: 'hsl(30, 100%, 50%)',
        text: 'hsl(200, 15%, 8%)',
      },
      dark: {
        primary: 'hsl(0, 0%, 100%)',
        secondary: 'hsl(0, 0%, 52%)',
        background: 'hsl(207, 26%, 17%)',
        surface: 'hsl(209, 23%, 22%)',
        error: 'hsl(0, 100%, 50%)',
        info: 'hsl(200, 100%, 50%)',
        success: 'hsl(120, 100%, 40%)',
        warning: 'hsl(30, 100%, 50%)',
        text: 'hsl(0, 0%, 100%)',
      },
    },
  },
})
