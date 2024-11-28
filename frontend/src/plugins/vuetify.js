import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomTheme = {
  dark: false,
  colors: {
    primary: '#800020', // Burgundy as the main theme color
    secondary: '#ffc107', // Golden yellow for contrast
    accent: '#e57373', // Muted rose for highlighting
    error: '#d32f2f', // Deep red for errors
    info: '#1976d2', // Rich blue for informational elements
    success: '#388e3c', // Deep green for success
    warning: '#f57c00', // Vibrant orange for warnings
  },  
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    },
  },
})
