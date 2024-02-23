import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import "./PaletteList.css";
import {Link} from "react-router-dom";

class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const {palettes} = this.props;
        return (
            <div className='paletteList'>
                <div className='container'>
                    <nav className='nav'>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className='palettes'>
                        {palettes.map(palette => (
                            <MiniPalette 
                            {...palette} 
                            handleClick={() => this.goToPalette(palette.id)} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default PaletteList;