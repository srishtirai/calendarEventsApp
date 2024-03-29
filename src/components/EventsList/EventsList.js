import ExpandableItem from '@enact/moonstone/ExpandableItem';
import Button from '@enact/moonstone/Button';
import IconButton from '@enact/moonstone/IconButton';
import './eventsList.css';

const EventsList = (props) => {
	return (
		<>
			{props.events.map((ev, i) => {
				return (
					<ExpandableItem key={i} title={ev.title} className="event">
						<div className="event-body">
							{ev.image.file_path != null ? <img src={ev.image.file_path} alt={ev.image.title} /> : ''}
							<div className="event-desc">{ev.description}</div>
							<IconButton
								onClick={() => props.deleteEvent(ev, props.date, props.month, props.year)}
								className="delete-button"
								size="small"
							>
								trash
							</IconButton>
						</div>
					</ExpandableItem>
				);
			})}
			<Button onClick={props.createNewEvent}>Create New Event</Button>
		</>
	);
};

export default EventsList;
