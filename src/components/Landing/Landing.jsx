import React from "react";
import Styles from "./dist/Landing.module.css";
import henryLogo from "../../misc/img/henryLogo.png";
import { Link } from "react-router-dom";

// const spinningWorld =
//   "https://thumbs.gfycat.com/FirsthandImmediateGlowworm-mobile.mp4";
import flagsGif from '../../misc/img/flagsGif.gif'
const Landing = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.circleContainer}>
        <img className={Styles.logo} src={henryLogo} alt="logo de henry" />
      </div>

      <div className={Styles.bodyContainer}>
        {/* <video loop autoPlay={true} muted>
          <source src={spinningWorld} type="video/mp4" />
        </video> */}
        <img src={flagsGif} alt="" />
      </div>

      <div className={Styles.buttonContainer}>
        <Link className={Styles.exploreButton} to={"/home"}>
          Explorar la app
        </Link>
      </div>
    </div>
  );
};

export default Landing;
