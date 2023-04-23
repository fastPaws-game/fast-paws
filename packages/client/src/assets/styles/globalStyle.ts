import { createGlobalStyle } from 'styled-components'
import PTSans400Woff from '../fonts/pt-sans-v17-cyrillic_latin-regular.woff'
import PTSans400Woff2 from '../fonts/pt-sans-v17-cyrillic_latin-regular.woff2'
import PTSans700Woff from '../fonts/pt-sans-v17-cyrillic_latin-700.woff'
import PTSans700Woff2 from '../fonts/pt-sans-v17-cyrillic_latin-700.woff2'

export const GlobalStyles = createGlobalStyle`
  /* pt-sans-regular - cyrillic_latin */
  @font-face {
    font-family: 'PT Sans';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: url(${PTSans400Woff2}) format('woff2'),
         url(${PTSans400Woff}) format('woff');
  }

  /* pt-sans-700 - cyrillic_latin */
  @font-face {
    font-family: 'PT Sans';
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: url(${PTSans700Woff2}) format('woff2'),
         url(${PTSans700Woff}) format('woff');
  }

  body {
    font-family: 'PT Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    margin: 0;
    scrollbar-gutter: stable;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    text-size-adjust: 100%;
    scrollbar-gutter: stable;
  }

  main {
    display: block;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b, strong {
    font-weight: bolder;
  }

  code, kbd, samp {
    font-family: monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  input {
    overflow: visible;
  }

  input, input:focus {
    border: none;
    box-sizing: border-box;
    outline: thin;
  }

  button {
    cursor: pointer;
    overflow: visible;
  }

  button, select {
    text-transform: none;
  }

  button, [type="button"], [type="reset"], [type="submit"] {
    appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"], [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-decoration {
    appearance: none;
  }

  ::-webkit-file-upload-button {
    appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }
`
