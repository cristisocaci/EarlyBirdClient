import "./Home.scss";
import Hello from "./hello/Hello";

function Home(){
    return(
        <div>
            <Hello name="Cristian" role="worker"></Hello>
        </div>
    );
}

export default Home;