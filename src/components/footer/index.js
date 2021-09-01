import React from 'react';
import './index.css';

const Footer = () => {
  return (
    <footer>
      <div className="main-footer">
        <img src={require("../../static/images/landing-leocorn/3-fot.png")} className="first-image" alt="" />
        <img src={require("../../static/images/landing-leocorn/1-fot.png")} className="first-images" alt="" />
        <img src={require("../../static/images/landing-leocorn/2-fot.png")} className="first-imagess" alt="" />
        <div className="auto-container main-fottt">
          <div className="row">
            <div className="col-lg-6">
              <div className="community">
                <h1>Join the community</h1>
                <p>LeoCorn is a blockchain platform designed to provide an easy to use launchpad that aims to help new quality blockchain projects to raise capital and easily distribute their tokens at the same time. LeoCorn currently operates on the Binance Smart Chain and helps launch the new IDO coins via a Decentralized liquidity Exchange(DEX) such as PancakeSwap.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="socials">
                <a className='linkss' href="https://t.me/eloinclub" target="_blank"><img src={require("../../static/images/landing-leocorn/2-fot-1.png")} alt="" /></a>
                <a className='linkss' href="https://twitter.com/eloinclub" target="_bkank"><img src={require("../../static/images/landing-leocorn/3-fot-1.png")} alt="" /></a>
                <a className='linkss' href="https://medium.com/@eloinproject" target="_blank"><img src={require("../../static/images/landing-leocorn/4-fot-1.png")} alt="" /></a>
                {/* <Link className='linkss' to='#'><img src={require("../../static/images/landing-leocorn/1-fot1.png")} alt="" /></Link> */}
                {/* <Link className='linkss' to='#'><img src={require("../../static/images/landing-leocorn/5-fot-1.png")} alt="" /></Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="all-right-reserved">
        <div className="auto-container">
          <div className="main-terms">
            <p className="main-termss">© 2021 LEOCORN, All Right Reserved</p>
            {/* <p className="main-term">Term & Conditions</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;