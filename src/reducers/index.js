import imageListReducer from './imageReducer';
import deviceListReducer from './deviceReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	device: deviceListReducer,
	image: imageListReducer
});
export default rootReducer;
