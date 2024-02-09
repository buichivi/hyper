import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
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
            />
        </Provider>
    </React.StrictMode>,
);
