import React, {Component} from 'react';

import './MainFrame.css';
import SectionRect from './SectionRect';

// Assets
import ncsuLogo from '../../assets/ncstate_logo.png';

class MainFrame extends Component{

    sectionFrames = [
        {
            title: 'Education',
            lighterColor: '#ee1d1d',
            lightColor: '#b42121',
            midColor: '#5f0808',
            blackColor: '#370100',
            logo: ncsuLogo
        },
        {
            title: 'Projects',
            lightColor: '#CCC',
            //midColor: '#888',
            lighterColor: '#FFF'
        },
        {
            title: 'Something'
        }
    ];

    render(){
        return (
            <div id="main-wrapper">
                {this.sectionFrames.map((element) =>
                    <SectionRect title={element.title}
                                 lightColor={element.lightColor}
                                 midColor={element.midColor}
                                 lighterColor={element.lighterColor}
                                 blackColor={element.blackColor}
                                 logo={element.logo}/>)}
            </div>
        );
    }
}

export default MainFrame;