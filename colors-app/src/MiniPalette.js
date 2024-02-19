import React from 'react';
import "./MiniPalette.css";
// import { withStyles } from '@material-ui/core/styles';


function MiniPalette(props){
    const {paletteName, emoji, colors} = props;
    const miniColorBoxes = colors.map(color => (
        <div 
        className='miniColor' 
        style={{backgroundColor: color.color}}
        key= {color.name} 
        />
    ));
    return (
        <div className='root'>
            <div className='colors'>{miniColorBoxes}</div>
            <h5 className='title'>{paletteName} <span className='emoji'>{emoji}</span></h5>
        </div>
    );
}
export default (MiniPalette);