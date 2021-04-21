import React from 'react';
import LabeledIcon from '@enact/moonstone/LabeledIcon';

const Days = (props) => {
	let blanks = [];
	for (let i = 0; i < props.firstDayOfMonth(); i++) {
		blanks.push(<td key={i * 80} className="emptySlot">
			{''}
		</td>
		);
	}
	let daysInMonth = [];
	const getEvents = (d) => {
		let events = null;
		if (props.monthsData[props.month][d.toString()]) {
			let daysData = props.monthsData[props.month][d.toString()];
			if (daysData.length > 3) {
				events = [];
				events[0] = <div key="0" className="event-element">{daysData[0].title}</div>;
				events[1] = <div key="1" className="event-element">{daysData[1].title}</div>;
				events[2] = <LabeledIcon className="more-event-element" icon="arrowsmallright" labelPosition="before">Click to view more</LabeledIcon>;
			} else {
				events = daysData.map((ev, i) => {
					return (
						<div key={i} className="event-element">{ev.title}</div>
					);
				} );
			}
		}

		return events;
	};
	for (let d = 1; d <= props.daysInMonth(); d++) {
		let className = (d === props.currentDay() ? 'day current-day' : 'day');
		// let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
		if (props.monthsData && props.monthsData[props.month]) {
			daysInMonth.push(
				<td
					key={d} onClick={(e) => {
						props.onDayClick(e, d);
					}} className={className}
				>
					<span className="day-text">{d}</span>
					{getEvents(d)}
				</td>
			);
		} else {
			daysInMonth.push(
				<td
					key={d} onClick={(e) => {
						props.onDayClick(e, d);
					}} className={className}
				>
					<span className="day-text">{d}</span>
				</td>
			);
		}
	}
	let totalSlots = [...blanks, ...daysInMonth];
	let rows = [];
	let cells = [];

	totalSlots.forEach((row, i) => {
		if ((i % 7) !== 0 || i === 0) {
			cells.push(row);
		} else {
			let insertRow = cells.slice();
			rows.push(insertRow);
			cells = [];
			cells.push(row);
		}
		if (i === totalSlots.length - 1) {
			let insertRow = cells.slice();
			rows.push(insertRow);
		}
	});

	let trElems = rows.map((d, i) => {
		return (
			<tr key={i * 100} className="dates-row">
				{d}
			</tr>
		);
	});
	return (
		<>
			{trElems}
		</>
	);
};

export default Days;
