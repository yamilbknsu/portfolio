import React, { Component } from 'react';
import './SectionRect.css';

class SectionRect extends Component{

    constructor(props){
        super(props);
        this.state = {
            isHover: false
        };

        this.lightColor = (props.lightColor || 'rgb(0, 162, 194)');
        this.midColor = (props.midColor || 'rgba(9,9,121,1)');
        this.blackColor = (props.blackColor || 'rgba(2,0,36,1)');
        this.lighterColor = (props.lighterColor || 'rgb(0, 200, 240)');

        this.gradientDist = [' 0%', ' 10%', ' 50%', ' 90%', ' 100%'];
    }

    // onHover Handler
    handleMouseEnter = () => {
        this.setState({hover: true});
    };

    handleMouseLeave = () => {
        this.setState({hover: false});
    };

    defaultStyle = {
        backgroundColor: 'grey'
    }

    getStyle = () => {
        return {
            background: this.backGradient([this.blackColor, this.midColor,
                         this.state.hover ? this.lighterColor:this.lightColor, this.midColor, this.blackColor])
        }
    };

    render(){
        return (
            <div id="rect-wrapper" style={this.getStyle()}
                    onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <h1>{this.props.title}</h1>
                        {
                            this.renderLogo()
                        }
            </div>
        );
    }

    // Background string computation
    backGradient = (colors) => {
        return 'linear-gradient(50deg, ' + colors.map((c, i) =>{
            return c + this.gradientDist[i];
        }).join(',') + ')';
    }

    // Logo rendering
    renderLogo = () => {
        if(!this.props.logo) return []

        return (
            <div id="logo-container">
                <img id='logo' src={this.props.logo} alt="" />
            </div>
        )
    }
}

export default SectionRect;