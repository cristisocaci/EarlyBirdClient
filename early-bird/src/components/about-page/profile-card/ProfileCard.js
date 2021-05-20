import React from 'react';
import './ProfileCard.scss';
import githubLogo from '../Images/github.png';
import linkedinLogo from '../Images/linkedin.png';

function ProfileCard(props) {
    return (
        <div className="profile-card">
            <div className="profile-card__divimg">
                <img className="profile-card__divimg__img" src={props.img} alt=""></img>
            </div>
            <div className="profile-card__name">{props.name}</div>
            <div className="profile-card__buttons">
                <div className="profile-card__buttons__linkedin">
                    <button className="profile-card__buttons__linkedin__btn round" 
                    onClick={()=>{window.open(props.linkedin, "_blank")}} 
                    disabled={props.linkedin == null}>
                        <img src={linkedinLogo} className="profile-card__buttons__linkedin__btn__logo" alt=""></img>
                        LinkediIn
                    </button>
                </div>
                <div className="profile-card__buttons__github">
                    <button className="profile-card__buttons__github__btn round" 
                    onClick={()=>{window.open(props.github, "_blank")}}
                    disabled={props.github == null}>
                        <img src={githubLogo} className="profile-card__buttons__github__btn__logo" alt=""></img>
                         GitHub
                    </button>
                </div>
            </div>
            <div className="profile-card__bg">
            </div>
        </div>
    );
}

export default ProfileCard;