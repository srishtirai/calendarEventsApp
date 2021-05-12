import {Component} from 'react';

import css from './MainPanel.view.less';
import Calendar from '../components/Calendar/Calendar';

export default class MainPanel extends Component {

	onDayClick = () => {
		// window.alert(day);
	};

	render () {
		return (
			<div className="App">
				<Calendar
					style={css.mainDiv}
					onDayClick={(e, day) => this.onDayClick(e, day)}
				/>
			</div>
		);
	}
}

// export default MainPanel;
