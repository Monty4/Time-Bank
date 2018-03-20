import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimebankApp from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TimebankApp />, document.getElementById('root'));
registerServiceWorker();
