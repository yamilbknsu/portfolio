import React, {Component} from 'react';
import './PageHeader.css';
import profilePhoto from '../../assets/profile_photo.jpg';

class PageHeader extends Component{

    render(){
        return (
        <div id="header-wrapper">
            <img id="profile-photo" src={profilePhoto} alt="Profile"/>
            <h2>Yamil Essus</h2>
        </div>)
    }
}

export default PageHeader;