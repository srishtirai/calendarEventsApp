import LS2Request from '@enact/webos/LS2Request';

export const dbServices = {
	createKind : (cb) => {
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'putKind',
			parameters: {
				'id':'com.domain.app.service.familyeventplanner:4',
				'owner':'com.domain.app.familyeventplanner',
				'indexes':[
					{'name':'year', 'props':[{'name':'year'}]},
					{'name':'month', 'props':[{'name':'month'}]},
					{'name':'date', 'props':[{'name':'date'}]},
					{'name':'fullDate', 'props':[{'name':'year'}, {'name':'month'}, {'name':'date'}]}
				]
			},
			onSuccess: (res) => {
				console.log('Success response :: ', res);
				cb(res);
			},
			onFailure: (res) => {
				console.log('Failed response :: ', res);
				cb(res);
			}
		});
	},
	putData : (obj, cb) => {
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'put',
			parameters: {
				'objects':[
					obj
				]
			},
			onSuccess: (res) => {
				console.log('Success response :: ', res);
				cb(res);
			},
			onFailure: (res) => {
				console.log('Failed response :: ', res);
				cb(res);
			}
		});
	},
	findData : (queryObj, cb) => {
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'find',
			parameters: {
				'query': queryObj
			},
			onSuccess: (res) => {
				console.log('Success response :: ', res);
				cb(res);
			},
			onFailure: (res) => {
				console.log('Failed response :: ', res);
				cb(res);
			}
		});
	},
	deleteEvent: (id) =>{
		return new LS2Request().send({
			service: 'luna://com.webos.service.db',
			method: 'del',
			parameters: {
			'ids' : [id]
			},
			onSuccess: (res) => {
				console.log('Success response :: ', res);
			},
			onFailure: (res) => {
				console.log('Failed response :: ', res);
			}
		});
	}
};
