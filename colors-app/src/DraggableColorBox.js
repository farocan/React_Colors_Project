import React from 'react';
import "./DraggableColorBox.css";

export default function DraggableColorBox(props){
    const{color} = props;
    return(
        <div 
        className='draggableColorBox' 
        style={{backgroundColor: color}}
        >
            {props.name}
        </div>
    )
}