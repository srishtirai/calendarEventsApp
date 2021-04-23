import {types} from './types';
import LS2Request from '@enact/webos/LS2Request';
import mockImageList  from '../../assets/mock/imageList.json';

const getImageListRequest = () => {
	return {
		type: types.FETCH_IMAGE_LIST_REQUEST
	};
};

const setImageListSuccess = (imageList) => {
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

const getImageList = ({uri}) => (dispatch) => {
	dispatch(getImageListRequest());
	if (uri == "DefaultImages") {
		for (var x in mockImageList.imageList.results){
			mockImageList.imageList.results[x].selected= false;
		}
		dispatch(setImageListSuccess(mockImageList.imageList));
	}
	else{
	return new LS2Request().send({
		service: 'luna://com.webos.service.mediaindexer/',
		method: 'getImageList',
		parameters: {
			uri: uri
		},
		onSuccess: (res) => {
			const {returnValue, imageList} = res;
			if (returnValue) {
				for (var y in imageList.results){
					imageList.results[y].selected= false;
				}
				dispatch(setImageListSuccess(imageList));
			}
		},
		onFailure: (err) => {
			dispatch(setImageListError(err.errorText));
		}
	});
}
};

export {
	getImageList,
	getImageListRequest,
	setImageListError,
	setImageListSuccess
};
