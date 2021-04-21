import imageListReducer from './imageReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	image: imageListReducer
});
export default rootReducer;
