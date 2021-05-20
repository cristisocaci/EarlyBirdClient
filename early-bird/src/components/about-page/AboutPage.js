import "./AboutPage.scss";
import ProfileCard from "./profile-card/ProfileCard";
import CristiS from "./Images/CristiS.jpg";
import Varga from "./Images/Varga.jpeg";
import CristiN from "./Images/CristiN.jpeg";
import Flaviu from "./Images/Flaviu.jpeg";
import Popica from "./Images/Popica.jpeg";

function AboutPage() {
    let us=[
        {
            img: Popica,
            name: "Vlad Andrei Popica",
            linkedin: "https://www.linkedin.com/in/andrei-popica/",
            github: "https://github.com/popicaandrei"
        },
        {
            img: CristiS,
            name: "Marius-Cristian Socaci",
            linkedin: "https://www.linkedin.com/in/cristi-socaci/",
            github: "https://github.com/cristisocaci/"
        },
        {
            img: CristiN,
            name: "Cristian-Mihai Nicolae",
            linkedin: "https://www.linkedin.com/in/cristian-mihai-nicolae-24637a192/",
            github: "https://github.com/cristian-nicolae"
        },
        {
            img: Flaviu,
            name: "Flaviu-Vlad Raita",
            linkedin: "https://www.linkedin.com/in/flaviuvr/",
            github: "https://github.com/flaviuvr"
        },
        {
            img: Varga,
            name: "Andrei Varga",
            linkedin: null,
            github: null
        },
    ];

    return(
        <div className="center-about-page">
            <h1 className="title">Created for <span className="text-red">hustlers</span>, by <span className="text-red">hustlers</span> 🔥</h1>
            <p className="description"> Our aim is to create a platform that connects skilled people <br></br> who want to put their abilities into practice,
                gain some experience and earn extra income.<br></br><span className="text-red"><b> It is from people to people</b></span></p>


            <h1 className="subtitle">Meet the <span className="text-red">team</span>🔥</h1>
            <div className="profile-card-grid">
                {us.map((x, i) => (
                    <ProfileCard
                        img={x.img}
                        name={x.name}
                        linkedin={x.linkedin}
                        github={x.github}
                        key={x.name + i}
                    ></ProfileCard>
                ))}
            </div>
        </div>
    )
  
}

export default AboutPage;
