import React, { Component } from 'react';
import Button from '@enact/moonstone/Button';
// import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';

import css from './MainPanel.view.less';
import Calendar from '../components/Calendar/Calendar';

export default class MainPanel extends Component {

	onDayClick = (e, day) => {
		// window.alert(day);
	}

	render() {
		return(
		<div className="App">
			<Calendar style={css.mainDiv}
			  onDayClick={(e, day)=> this.onDayClick(e, day)}/>     
		</div>
	)}
};

// export default MainPanel;
