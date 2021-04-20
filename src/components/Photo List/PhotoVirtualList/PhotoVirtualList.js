/* eslint-disable enact/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-bind */

import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import VirtualList from '../VirtualList';
import GridListImageItem from '@enact/moonstone/GridListImageItem'
import css from './PhotoVirtualList.module.less';

class PhotoVirtualList extends Component {
	// playList = this.props.playList;
	// Renders a thumbnail item

	// updateCurrentIndex = (index) => {
	// 	this.props.onSelectPhoto(index);
	// };

	renderItem = () => {
		// const
		// 	data = this.playList,
		// 	item = data[index],
		// 	fileName = item.fileName || item.itemName;

		return (
			<GridListImageItem
			source="https://picsum.photos/200/200"
		/>
		);
	};

	render () {
		return (
			<VirtualList
				className={css.photoSelector}
				dataSize={30}
				direction="horizontal"
				focusableScrollbar
				isDivComponent
				itemRenderer={this.renderItem}
				itemSize={{
					minWidth: ri.scale(100),
					minHeight: ri.scale(120)
				}}
				onScrollStop={this.onScrollStopHandler}
				spacing={ri.scale(20)}
			/>
		);
	}
}

export default PhotoVirtualList;
