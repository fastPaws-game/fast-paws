import {} from 'styled-components';
import { lightTheme as theme } from '../assets/styles/theme';
declare module 'styled-components' {
  type Theme = typeof theme;
  export type DefaultTheme = Theme
}
