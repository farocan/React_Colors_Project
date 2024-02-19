import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import "./PaletteList.css";
import {Link} from "react-router-dom";

class PaletteList extends Component {
    render() {
        const {palettes} = this.props;
        return (
            <div className='root'>
                <div className='container'>
                    <nav className='nav'>
                        <h1>React Colors</h1>
                    </nav>
                    <div className='palettes'>
                        {palettes.map(palette => (
                            <MiniPalette {...palette} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default PaletteList;