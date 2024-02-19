import React from 'react';
import "./MiniPalette.css";
// import { withStyles } from '@material-ui/core/styles';


function MiniPalette(props){
    const {paletteName, emoji} = props;
    return (
        <div className='root'>
            <div className='colors'></div>
            <h5 className='title'>{paletteName} <span className='emoji'>{emoji}</span></h5>
        </div>
    );
}
export default (MiniPalette);