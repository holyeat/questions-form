import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

if (!window.api) {
  window.api = 'http://localhost:904/api/v1/';
}

render(
  <App />,
  document.getElementById('root')
)
