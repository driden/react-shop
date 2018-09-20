import React from 'react';
import { render } from 'react-dom';
import App from './containers/app'


const appDiv = document.getElementById('app')

appDiv && render(<App />, appDiv);
