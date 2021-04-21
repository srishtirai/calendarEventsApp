import React, {Component} from 'react';
import moment from 'moment';
import Button from '@enact/moonstone/Button';
import DatePicker from '@enact/moonstone/DatePicker';
import Input from '@enact/moonstone/Input';
import ri from '@enact/ui/resolution';
import VirtualGridList from '@enact/ui/VirtualList';
import ImageItem from '@enact/ui/ImageItem';
import imageList  from '../../../assets/mock/imageList.json';
require.context('../../../assets/samplePhoto/', false, /\.jpg$/);

class CreateForm extends Component {
    state = {
        datePickerVal : this.props.currentSelectedDate,
    	eventTitle: null,
    	eventDesc : null,
        pickedImage: null,
        // selected: false
    };
    onDatePickerChange = (d) => {
    	this.setState({datePickerVal: d.value});
    };
    onEventTitleChange = (t) => {
    	this.setState({eventTitle:t.value});
    };
    onEventDescChange = (de) => {
    	this.setState({eventDesc:de.value});
    };
    onButtonSubmit = () => {
    	if (this.state.eventTitle && this.state.eventTitle !== '') {
    		if (this.state.eventDesc && this.state.eventDesc !== '') {
    			let month = moment(this.state.datePickerVal).month() + 1;
    			let obj = {};
    			obj['year'] = moment(this.state.datePickerVal).year().toString();
    			obj['month'] = month.toString();
    			obj['date'] = moment(this.state.datePickerVal).date().toString();
    			obj['event'] = {
    				'title' : this.state.eventTitle,
    				'description' : this.state.eventDesc
    			};
                obj['image'] = this.state.pickedImage;
    			console.log(obj);
    			this.props.postObj(obj);
    		} else {
    			this.props.triggerNotification({message: 'Event Description is Mandatory'});
    		}
    	} else {
    		this.props.triggerNotification({message: 'Event Title is Mandatory'});
    	}
    };

    onSelectImage = (index) => {
        this.setState({pickedImage: imageList.imageList.results[index]});
    };

    renderItem = ({index, ...rest}) => {
    	return (
    		<ImageItem
		        src={imageList.imageList.results[index].file_path}
    			onClick={()=>this.onSelectImage(index)}
                // selected ={this.state.selected}
	        />
    	);
    };

    render () {
    	return (
    		<>
    			<DatePicker
    				onChange={this.onDatePickerChange}
    				title="Select Date"
    				value={this.state.datePickerVal}
	            />
    			<div className="event-input">
    				<Input placeholder="Enter Event Title Here" onChange={this.onEventTitleChange} value={this.state.eventTitle} />
	            </div>
    			<div className="event-input">
    				<Input className="event-input-internal" placeholder="Description of Event Here" onChange={this.onEventDescChange} value={this.state.eventDesc} />
	            </div>
    			<div>
    				<label>Pick an Image</label>
	            </div>
    			<VirtualGridList
    				className="photo-list"
    				itemRenderer={this.renderItem}
    				dataSize={imageList.imageList.count}
    				horizontalScrollbar="visible"
    				direction="horizontal"
    				clientSize={{
    					clientWidth: ri.scale(600),
    					clientHeight: ri.scale(120)
    				}}
    				itemSize={{
    					minWidth: ri.scale(100),
    					minHeight: ri.scale(100)
    				}}
    				spacing={ri.scale(20)}
	            />
    			<Button onClick={this.onButtonSubmit}>Create Event</Button>
	</>
    	);
    }
}

export default CreateForm;
