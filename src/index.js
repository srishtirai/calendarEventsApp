import {render} from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const appElement = (
	<Provider store={store}>
		<App />
	</Provider>
);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
