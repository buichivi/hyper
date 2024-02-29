import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './store';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                closeOnClick={true}
                limit={4}
                draggable={true}
                draggableDirection="x"
                autoClose={3000}
                className="!top-[4.5rem]"
            />
        </Provider>
        ,
    </React.StrictMode>,
);
