import {types} from './types';
import LS2Request from '@enact/webos/LS2Request';
import mockImageList  from '../../assets/mock/imageList.json'

const getImageListRequest = () => {
	return {
		type: types.FETCH_IMAGE_LIST_REQUEST
	};
};

const setImageListSuccess = (imageList) => {
	console.log(imageList)
	return {
		type: types.FETCH_IMAGE_LIST_SUCCESS,
		payload: imageList
	};
};

const setImageListError = (message) => {
	return {
		type: types.FETCH_IMAGE_LIST_ERROR,
		payload: message
	};
};

const getImageList = () => (dispatch) => {
	dispatch(getImageListRequest());
	if (typeof window === 'object' && !window.PalmSystem) {
		dispatch(setImageListSuccess(mockImageList.imageList));
		return {};
	}
	// return new LS2Request().send({
	// 	service: 'luna://com.webos.service.mediaindexer/',
	// 	method: 'getImageList',
	// 	parameters: {
	// 		uri: uri
	// 	},
	// 	onSuccess: (res) => {
	// 		const {returnValue, imageList} = res;
	// 		if (returnValue) {
	// 			dispatch(setImageListSuccess(imageList.results));
	// 		}
	// 	},
	// 	onFailure: (err) => {
	// 		dispatch(setImageListError(err.errorText));
	// 	}
	// });
};

export {
	getImageList,
	getImageListRequest,
	setImageListError,
	setImageListSuccess
};
