import "./AboutPage.scss";

function AboutPage() {
    return(
    <div className="center-about-page">
    <h1 className="title">Created for <span className="text-red">hustlers</span>, by <span className="text-red">hustlers</span> 🔥</h1>
    <p className="description"> Our aim is to create a platform that connects a skilled people <br></br> that want to put their abilities into practice,
     gain some experience and earn an extra income; <br></br>with the people that have a need and are searching for someone nearby ready to help them.
     <br></br><span className="text-red"><b> It is from people to people</b></span></p>
  

    <h1 className="subtitle">Meet the <span className="text-red">team</span>🔥</h1>

    <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
    <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" 
    data-vanity="andrei-popica" data-version="v1">
    <a className="badge-base__link LI-simple-link" href="https://ro.linkedin.com/in/andrei-popica?trk=profile-badge">Andrei Popica</a></div>

    </div>
    )
  
}

export default AboutPage;
