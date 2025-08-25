
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from "./app/store";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
<Provider store={store}>
    <App />
 </Provider>,
);




