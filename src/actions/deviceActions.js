import {types} from './types';
import LS2Request from '@enact/webos/LS2Request';
// import mockDeviceList from '../../assets/mock/deviceList.json';

const getDeviceListRequest = () => {
	return {
		type: types.FETCH_DEVICE_LIST_REQUEST
	};
};

const setDeviceListSuccess = (deviceList) => {
	return {
		type: types.FETCH_DEVICE_LIST_SUCCESS,
		payload: deviceList
	};
};

const setDeviceListError = (errMessage) => {
	return {
		type: types.FETCH_DEVICE_LIST_ERROR,
		payload: errMessage
	};
};

const getDeviceList = ({subscribe}) => (dispatch) => {
	// if (typeof window === 'object' && !window.PalmSystem) {
	// 	dispatch(setDeviceListSuccess(mockDeviceList.pluginList));
	// 	return{};
	// }
	dispatch(getDeviceListRequest());
	return new LS2Request().send({
		service: 'luna://com.webos.service.mediaindexer/',
		method: 'getDeviceList',
		parameters: {
			subscribe: subscribe
		},
		onSuccess: (res) => {
			dispatch(setDeviceListSuccess(res.pluginList));
		},
		onFailure: (err) => {
			dispatch(setDeviceListError(err.errorText));
		}
	});
};


export {
	getDeviceList,
	getDeviceListRequest,
	setDeviceListSuccess,
	setDeviceListError
};
