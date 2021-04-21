import React from 'react';
import Icon from '@enact/moonstone/Icon';
import Dropdown from '@enact/moonstone/Dropdown';
import EditableIntegerPicker from '@enact/moonstone/EditableIntegerPicker';

const CalendarHeader = (props) => {
	return (
		<tr className="calendar-header">
			<td colSpan="1">
				<Icon
					onClick={(e) => {
						props.prevMonth();
					}}
				>arrowsmallleft</Icon>
			</td>
			<td colSpan="5" className="nav-content">
				<Dropdown
					selected={props.months.indexOf(props.month())}
					width="tiny"
					onSelect={(d) => {
						props.onSelectChange(d);
					}}
				>
					{props.months}
				</Dropdown>

				{' '}
				<EditableIntegerPicker
					editMode
					max={3000}
					min={1000}
					value={parseInt(props.year())}
					onChange={(d) => {
						props.onYearChange(d);
					}}
					width="small"
				/>
			</td>
			<td colSpan="1" className="nav-month">
				<Icon
					onClick={(e) => {
						props.nextMonth();
					}}
				>arrowsmallright</Icon>
			</td>
		</tr>
	);
};

export default CalendarHeader;
