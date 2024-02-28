import React from 'react';
import "./DraggableColorBox.css";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DraggableColorBox(props){
    const{color} = props;
    return(
        <div 
        className='draggableColorBox' 
        style={{backgroundColor: color}}
        >
            <div className='boxContent'>
                <span>{props.name}</span>
                <DeleteIcon className='deleteIcon'/>
            </div>
        </div>
    )
}