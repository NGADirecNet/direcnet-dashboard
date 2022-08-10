import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider'
import { WeatherContextProvider } from './contexts/WeatherContextProvider';

ReactDOM.render(
    <ContextProvider>
        <WeatherContextProvider>
            <App />
        </WeatherContextProvider>
    </ContextProvider>,
    document.getElementById('root')
);