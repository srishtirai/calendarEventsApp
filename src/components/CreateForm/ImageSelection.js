import React, { useEffect, useState } from 'react';
import ri from '@enact/ui/resolution';
import Dropdown from '@enact/moonstone/Dropdown';
import VirtualGridList from '@enact/ui/VirtualList';
import './createForm.css';

const ImageSelection = (props) => {

    const [selectedDecice, setSelectedDevice] = useState(0);
    return(
        <>
    <div>
    				<label className="image-heading">Pick an Image</label>
	            </div>
				<div>
    				<label className="source-label">Choose Source</label>
								<Dropdown
								selected={selectedDecice}
								width="large"
								onSelect={(d) => {
									setSelectedDevice(d.selected);
                                    props.getImageList(d.selected);
								}}
								>
								{props.devices}
								</Dropdown> 
	            </div>
    			<VirtualGridList
    				className="photo-list"
    				itemRenderer={props.renderItem}
    				dataSize={props.imageList.count}
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
    				spacing={ri.scale(15)}
	            />
            </>
    )
                }

export default ImageSelection;