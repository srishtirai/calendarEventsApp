import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Button from '@enact/moonstone/Button';
import DatePicker from '@enact/moonstone/DatePicker';
import Input from '@enact/moonstone/Input';
import ri from '@enact/ui/resolution';
import VirtualGridList from '@enact/ui/VirtualList';
import ImageItem from '@enact/ui/ImageItem';
import {getImageList} from '../../actions/imageActions';
import './createForm.css';
require.context('../../../assets/samplePhoto/', false, /\.jpg$/);

const CreateForm = ({getListImage, imageList, currentSelectedDate, postObj, triggerNotification})=> {
    
    useEffect(() => {
		getListImage();
		for (var x in imageList.results){
			imageList.results[x].selected= false;
		}
	}, []);
	
    const [datePickerVal, setdatePickerVal] = useState(currentSelectedDate);
    const [eventTitle, seteventTitle] = useState(null);
    const [eventDesc, seteventDesc] = useState(null);
    const [pickedImage, setpickedImage] = useState(null);

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
		console.log("pickedImage "+pickedImage);
		console.log("index "+index);
		if(pickedImage != null){
			imageList.results[pickedImage].selected = false;
			if(pickedImage == index) setpickedImage(null);
			else{
				setpickedImage(index);
				imageList.results[index].selected = true;
			}	
		}
		else{
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
				if(pickedImage){
					obj['image'] = imageList.results[pickedImage];
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
		let image_list_item = imageList.results[index].selected ? "with-border" :  "no-border" ;
    	return (
    		<ImageItem
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
    			<div>
    				<label>Pick an Image</label>
	            </div>
    			<VirtualGridList
    				className="photo-list"
    				itemRenderer={renderItem}
    				dataSize={imageList.count}
    				horizontalScrollbar="visible"
    				direction="horizontal"
    				clientSize={{
    					clientWidth: ri.scale(1300),
    					clientHeight: ri.scale(120)
    				}}
    				itemSize={{
    					minWidth: ri.scale(100),
    					minHeight: ri.scale(100)
    				}}
    				spacing={ri.scale(20)}
	            />
    			<Button onClick={onButtonSubmit}>Create Event</Button>
	</>
    	);
    }

const mapStateToProps = ({image}) => {
	return {
		imageList: image.imageList
	};
};

const mapDispatchToState = dispatch => {
	return {
		getListImage: () => dispatch(getImageList())
	};
};

export default connect(mapStateToProps, mapDispatchToState)(CreateForm);

