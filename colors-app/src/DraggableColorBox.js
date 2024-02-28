import React from 'react';
import "./DraggableColorBox.css";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DraggableColorBox(props){
    const{color, handleClick, name} = props;
    return(
        <div 
        className='draggableColorBox' 
        style={{backgroundColor: color}}
        >
            <div className='boxContent'>
                <span>{name}</span>
                <DeleteIcon 
                className='deleteIcon'
                onClick= {handleClick}
                />
            </div>
        </div>
    )
}