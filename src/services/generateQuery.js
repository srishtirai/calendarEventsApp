const _kind = 'com.domain.app.service.familyeventplanner:4';
export const generateQuery = {
	findQuery : (obj) => {
		let query = {
			'from':_kind,
			'where':[]
		};
		for (let key in obj) {
			query['where'].push({
				'prop' : key,
				'op': '=',
				'val': obj[key]
			});
		}
		return query;
	},
	filterData : (arr) => {
		let filteredData = {};

		for (let i = 0; i < arr.length; i++) {
			if (!filteredData[arr[i].year]) {
				filteredData[arr[i].year] = {};
			}

			if (!filteredData[arr[i].year][arr[i].month]) {
				filteredData[arr[i].year][arr[i].month] = {};
			}

			if (!filteredData[arr[i].year][arr[i].month][arr[i].date]) {
				filteredData[arr[i].year][arr[i].month][arr[i].date] = [];
			}

			let temp = {};
			temp['title'] = arr[i]['event']['title'];
			temp['description'] = arr[i]['event']['description'];
			temp['image'] = arr[i]['image'];

			filteredData[arr[i].year][arr[i].month][arr[i].date].push(temp);
		}

		return filteredData;
	}
};
