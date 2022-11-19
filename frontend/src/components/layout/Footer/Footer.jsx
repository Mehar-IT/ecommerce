import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import "./footer.css";
export default function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUT APP</h4>
        <p>Download App for Andriod and IOS mobile phone</p>
        <img src={playstore} alt="" />
        <img src={appstore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>EOMMERCE.</h1>
        <p>High quality is our first priority</p>
        <p>Copyright 2022 © Hamza</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://www.facebook.com/hamzatariquearain1">Facebook</a>
        <a href="https://www.instagram.com/hamza.arainpak/">Instagram</a>
        <a href="https://twitter.com/HamzaTarique">Twitter</a>
      </div>
    </footer>
  );
}
