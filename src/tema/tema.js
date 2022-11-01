import { DefaultTheme } from 'react-native-paper'

export const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#ffffff',
    primario: '#560CCE',
    secundario: '#414757',
    error: '#f13a59',
  },
  titulo:{
        color:'#ffffff',
        tam:40,

  },
  subtitulo:{
        color:'#ffffff',
        tam:25,
  },
  fondo:{
      color:"#0d1117",
  },
  header:{
      color:"#414757"
  }
}
