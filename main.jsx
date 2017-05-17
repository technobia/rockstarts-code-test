import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Homepage from './src/Homepage.container.jsx'
import HomepageReducer from './src/Homepage.reducer.jsx';

export const store = createStore(HomepageReducer);

ReactDOM.render(
    <Provider store={store}>
        <Homepage/>
    </Provider>,
    document.getElementById('app')
);
