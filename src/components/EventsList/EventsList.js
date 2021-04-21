import React from 'react';
import ExpandableItem from '@enact/moonstone/ExpandableItem';
import Button from '@enact/moonstone/Button';

const EventsList = (props) => {
	return (
		<>
			{props.events.map((ev, i) => {
				return (
					<ExpandableItem key={i} title={ev.title}>
						{ev.description}
					</ExpandableItem>
				);
			})}
			<Button onClick={props.createNewEvent}>Create New Event</Button>
		</>
	);
};

export default EventsList;
