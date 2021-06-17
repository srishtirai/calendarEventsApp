import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Button from '@enact/moonstone/Button';
import DatePicker from '@enact/moonstone/DatePicker';
import Input from '@enact/moonstone/Input';
import ImageItem from '@enact/ui/ImageItem';
import {getImageList} from '../../actions/imageActions';
import {getDeviceList} from '../../actions/deviceActions';
import './createForm.css';
import ImageSelection from './ImageSelection';
require.context('../../../assets/samplePhoto/', false, /\.png$/);

const CreateForm = ({getListDevice, getListImage, imageList, deviceList, currentSelectedDate, postObj, triggerNotification}) => {

	useEffect(() => {
		getListDevice();
		getListImage('DefaultImages');
	}, []);

	const [datePickerVal, setdatePickerVal] = useState(currentSelectedDate);
	const [eventTitle, seteventTitle] = useState(null);
	const [eventDesc, seteventDesc] = useState(null);
	const [pickedImage, setpickedImage] = useState(null);
	let deviceInfo = [];

	const getDevices = () => {
		let list = [];
		list.push('Default Images');
		deviceInfo.push( {
			'name': 'Default Images',
			'uri': 'DefaultImages'
		 });
		deviceList.map((device) => {
			if (device.deviceList.length > 0) {
				device.deviceList.map((deviceList) => {
					deviceInfo.push(deviceList);
					list.push(deviceList.name);
				});
			}
		});
		return list;
	};
	let devices = getDevices();

	const getDeviceImageList = (e) => {
		const uri = deviceInfo[e].uri;
		getListImage(uri);
	};
	const onDatePickerChange = (date) => {
		setdatePickerVal(date.value);
	};
	const onEventTitleChange = (title) => {
		seteventTitle(title.value);
	};
	const onEventDescChange = (desc) => {
		seteventDesc(desc.value);
	};
	const onSelectImage = (index) => {
		if (pickedImage != null) {
			imageList.results[pickedImage].selected = false;
			if (pickedImage === index) setpickedImage(null);
			else {
				setpickedImage(index);
				imageList.results[index].selected = true;
			}
		} else {
			setpickedImage(index);
			imageList.results[index].selected = true;
		}
	};

	const onButtonSubmit = () => {
		if (eventTitle && eventTitle !== '') {
			if (eventDesc && eventDesc !== '') {
				let month = moment(datePickerVal).month() + 1;
				let obj = {};
				obj['year'] = moment(datePickerVal).year().toString();
				obj['month'] = month.toString();
				obj['date'] = moment(datePickerVal).date().toString();
				obj['event'] = {
					'title' : eventTitle,
					'description' : eventDesc
				};
				if (pickedImage!=null) {
					obj['image'] = imageList.results[pickedImage];
				} else {
					obj['image'] = {};
				}
				console.log(obj);
				postObj(obj);
			} else {
				triggerNotification({message: 'Event Description is Mandatory'});
			}
		} else {
			triggerNotification({message: 'Event Title is Mandatory'});
		}
	};

	const renderItem = ({index}) => {
		let image_list_item = imageList.results[index].selected ? 'with-border' :  'no-border';
		return (
			<ImageItem
				// placeholder={placeholder}
				className={image_list_item}
				src={imageList.results[index].file_path}
				onClick={() => onSelectImage(index)}
			/>
		);
	};

	return (
		<>
			<DatePicker
				onChange={onDatePickerChange}
				title="Select Date"
				value={datePickerVal}
			/>
			<div className="event-input">
				<Input placeholder="Enter Event Title Here" onChange={onEventTitleChange} value={eventTitle} />
			</div>
			<div className="event-input">
				<Input className="event-input-internal" placeholder="Description of Event Here" onChange={onEventDescChange} value={eventDesc} />
			</div>
			<ImageSelection
				renderItem={renderItem}
				imageList={imageList}
				devices={devices}
				getImageList={getDeviceImageList}
			/>
			<Button onClick={onButtonSubmit}>Create Event</Button>
		</>
	);
};

const mapStateToProps = ({device, image}) => {
	return {
		imageList: image.imageList,
		deviceList: device.deviceList
	};
};

const mapDispatchToState = dispatch => {
	return {
		getListDevice: () => dispatch(getDeviceList({
			subscribe: true
		})),
		getListImage: (uri) => dispatch(getImageList({
			uri: uri
		}))
	};
};

export default connect(mapStateToProps, mapDispatchToState)(CreateForm);

