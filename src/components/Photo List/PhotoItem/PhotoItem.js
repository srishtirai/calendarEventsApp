import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ImageItem from '../ImageItem/ImageItem';
import css from './PhotoItem.module.less';
import ImageDefaultThumb from '../../../assets/list/photo_default.png';


const PhotoItem = (props) => {
	const {className, thumbnailUri, ...rest} = props;
	let classes = classNames(css.photoItem, className);

	if (props.selected) {
		classes = classNames(css.photoItem, css.selected, className);
	}
	return (
		<ImageItem
			{...rest}
			className={classes}
			placeholder={ImageDefaultThumb}
			src={thumbnailUri.replace(/ /g, '%20') || ImageDefaultThumb}
		/>
	);
};

PhotoItem.propTypes = {
	/**
	 * Indicates selected or not
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	selected: PropTypes.bool,
	/**
	 * Thumbnail of the item
	 *
	 * @type {String}
	 * @public
	 */
	thumbnailPath: PropTypes.string,
	/**
	 * ThumbnailURL of the item
	 *
	 * @type {String}
	 * @public
	 */
	thumbnailUri: PropTypes.string
};

PhotoItem.defaultProps = {
	selected: false
};

PhotoItem.displayName = 'PhotoItem';

export default PhotoItem;
