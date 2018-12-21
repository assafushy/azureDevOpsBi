import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import config from './configFiles/config.js';

//set defualt access tolen for all requests
axios.defaults['auth'] = {"username":'',"password":config.AccessToken};

ReactDOM.render(<Provider store={store}>
<App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();