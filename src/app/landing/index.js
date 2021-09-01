import React, { useState, useCallback } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
// import PoolData from './PoolData';
import PoolCard from './PoolCard';
import { useWeb3React } from '@web3-react/core'
import axios from 'axios';
import ComingPoolCard from './ComingPoolCard';
import ClosedPoolCard from './ClosedPoolCard';
// import { Eligible } from '../../hooks/PoolDataFetcher'
const Landing = () => {
  const [activePool, getactivePool] = useState([]);
  const [comingPool, getComingPool] = useState([]);
  const [closedPool, getClosedPool] = useState([]);
  const { account } = useWeb3React();
  // const { eligible } = Eligible(tokenAddress);

  // const EligiblePool = useCallback(async (e) => {
  //   if(account){
  //     const pool = await eligible();
  //     // console.log("activePool",pool)
  //     if(activePool[0]){
  //     display = activePool.map((elem, index) => {
  //       const { id } = elem
  //       const t1 = 1; const t2 = 2; const t3 = 3; const t4 = 4;
  //       let tier3Date = new Date(elem.preSaleStartDateAndTime);
  //       tier3Date.setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 24)
  //       tier3Date.setMinutes(new Date(elem.preSaleStartDateAndTime).getMinutes() + 10)
  //       if(pool==1){
  //         return(
  //         <div className="row main-pool-featured">
  //            <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
  //             <Link to={'/pools/' + id + '/' + t1} id={1}>
  //               <PoolCard {...elem} tier={1} allcation={elem.tier1Allocation} max={elem.tier1MaxAmountPerUserInBNB}
  //                 min={elem.tier1MinAmountPerUserInBNB}
  //                 preSaleStartDateAndTime={new Date(elem.preSaleStartDateAndTime).setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 8)} />
  //             </Link>             
  //           </div>
  //         </div>
  //         )
  //       }
  //       else if(pool==2){
  //         return(
  //         <div className="row main-pool-featured">
  //         <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
  //         <Link to={'/pools/' + id + '/' + t2}>
  //           <PoolCard tier={2} {...elem} allcation={elem.tier2Allocation} max={elem.tier2MaxAmountPerUserInBNB}
  //             min={elem.tier3MinAmountPerUserInBNB}
  //             preSaleStartDateAndTime={new Date(elem.preSaleStartDateAndTime).setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 22)} />
  //         </Link>
  //       </div>
  //       </div>
  //         )
  //       }
  //       else if(pool==3){
  //         return(
  //         <div className="row main-pool-featured">
  //            <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
  //             <Link to={'/pools/' + id + '/' + t3}>
  //               <PoolCard tier={3} {...elem} allcation={elem.tier3Allocation} max={elem.tier3MaxAmountPerUserInBNB}
  //                 min={elem.tier3MinAmountPerUserInBNB}
  //                 preSaleStartDateAndTime={tier3Date} />
  //             </Link>
  //           </div>
  //           </div>
  //         )
  //       }
  //       else if(pool==4){
  //         return(
  //         <div className="row main-pool-featured">
  //            <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
  //             <Link to={'/pools/' + id + '/' + t4}>
  //               <PoolCard tier={4} {...elem} allcation={elem.tier4Allocation} max={elem.tier4MaxAmountPerUserInBNB}
  //                 min={elem.tier4MinAmountPerUserInBNB}
  //                 preSaleStartDateAndTime={elem.preSaleEndDateAndTime} />
  //             </Link>
  //           </div>
  //           </div>
  //         )
  //       }
  //       else{
  //         return 0
  //       }
       
  //     })
  //   }
  //   }
    

  // }, [eligible])

   let display = activePool.map((elem, index) => {
    const { id } = elem
    const t1 = 1; const t2 = 2; const t3 = 3; const t4 = 4;
    let tier3Date = new Date(elem.preSaleStartDateAndTime);
    tier3Date.setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 24)
    tier3Date.setMinutes(new Date(elem.preSaleStartDateAndTime).getMinutes() + 10)
    // let tier4Date = new Date(elem.preSaleStartDateAndTime);
    // tier4Date.setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 15)
    // tier4Date.setMinutes(new Date(elem.preSaleStartDateAndTime).getMinutes() + 20)
    // tier4Date.setDate(new Date(elem.preSaleStartDateAndTime).getDate() + 1);
    return (
      <div className="row main-pool-featured">
        <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
          <Link to={'/pools/' + id + '/' + t1} id={1}>
            <PoolCard {...elem} tier={1} allcation={elem.tier1Allocation} max={elem.tier1MaxAmountPerUserInBNB}
              min={elem.tier1MinAmountPerUserInBNB}
              preSaleStartDateAndTime={new Date(elem.preSaleStartDateAndTime).setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 8)} />
          </Link>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
          <Link to={'/pools/' + id + '/' + t2}>
            <PoolCard tier={2} {...elem} allcation={elem.tier2Allocation} max={elem.tier2MaxAmountPerUserInBNB}
              min={elem.tier3MinAmountPerUserInBNB}
              preSaleStartDateAndTime={new Date(elem.preSaleStartDateAndTime).setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 22)} />
          </Link>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
          <Link to={'/pools/' + id + '/' + t3}>
            <PoolCard tier={3} {...elem} allcation={elem.tier3Allocation} max={elem.tier3MaxAmountPerUserInBNB}
              min={elem.tier3MinAmountPerUserInBNB}
              preSaleStartDateAndTime={tier3Date} />
          </Link>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
          <Link to={'/pools/' + id + '/' + t4}>
            <PoolCard tier={4} {...elem} allcation={elem.tier4Allocation} max={elem.tier4MaxAmountPerUserInBNB}
              min={elem.tier4MinAmountPerUserInBNB}
              preSaleStartDateAndTime={elem.preSaleEndDateAndTime} />
          </Link>
        </div>
      </div>
    )
  })

  const getActivePoolData = async () => {
    try {
      await axios.get("http:///ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/all/active")
        .then((response) => {
          if (response.data.status) {
            getactivePool(response.data.msg)
          }
        });
    }
    catch (err) {
      // console.log(err);
      return false;
    }
  }
  const getComingPoolData = async () => {
    try {
      await axios.get("http://ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/all/pending")
        .then((response) => {
          if (response.data.status) {
            getComingPool(response.data.msg)
          }
        });
    }
    catch (err) {
      // console.log(err);
      return false;
    }
  }
  const getClosedPoolData = async () => {
    try {
      await axios.get("http://ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/all/finished")
        .then((response) => {
          if (response.data.status) {
            getClosedPool(response.data.msg)
          }
        });
    }
    catch (err) {
      // console.log(err);
      return false;
    }
  }
  React.useEffect(() => {
    getActivePoolData();
    getComingPoolData();
    getClosedPoolData();

  }, [])
  return (
    <div className='landing-nft'>
      <Navbar />
      <section className="header-section" style={{ backgroundImage: `url(${require("../../static/images/landing-leocorn/background-main.png")})` }}>
        <img src={require("../../static/images/landing-leocorn/background-main-head.png")} className="main-heads-one" alt="" />
        <div className="auto-container">
          <div className="main-head">
            <h1>LeoCorn Pools</h1>
            <p>LeoCorn is a blockchain platform designed to provide an easy to use launchpad that aims to help new quality blockchain projects to raise capital and easily distribute their tokens at the same time. LeoCorn currently operates on the Binance Smart Chain and helps launch the new IDO coins via a Decentralized liquidity Exchange(DEX) such as PancakeSwap.</p>
            <button>
              <a href="https://pancakeswap.finance/swap#/swap?outputCurrency=0xe39e2861AE9a45FA321c1B0155D2f99196b2A992" target="_blank">
                <img src={require("../../static/images/landing-leocorn/button-mamin-head.png")} alt="" />Buy on PancakeSwap
              </a>
            </button>
          </div>
        </div>
      </section>
      <section className="featured-pool">
        <div className="auto-container">
          <div className="row  ">
            <div className="searchbar">
              <h1>Active Pools</h1>

              {/* <div className="main-slider " onClick={EligiblePool}>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <p>Show Eligible Pools only</p>
              </div> */}
            </div>
          </div>
          {display}
        </div>
      </section>
      <section className="featured-pool-coming-soon">
        <div className="auto-container">
          <h1>Pools Coming Soon</h1>
          {comingPool.map((elem, index) => {
            let tier3Date = new Date(elem.preSaleStartDateAndTime);
            tier3Date.setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 22)
            tier3Date.setMinutes(new Date(elem.preSaleStartDateAndTime).getMinutes() + 10)
            let tier4Date = new Date(elem.preSaleStartDateAndTime);
            tier4Date.setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 24)
            tier4Date.setMinutes(new Date(elem.preSaleStartDateAndTime).getMinutes() + 20)
            return (
              <div className="row main-pool-featured">
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <ComingPoolCard {...elem} tier={1} allcation={elem.tier1Allocation} max={elem.tier1MaxAmountPerUserInBNB}
                    min={elem.tier1MinAmountPerUserInBNB}
                  />
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index} >
                  <ComingPoolCard tier={2} {...elem} allcation={elem.tier2Allocation} max={elem.tier2MaxAmountPerUserInBNB}
                    min={elem.tier2MinAmountPerUserInBNB}
                    preSaleStartDateAndTime={new Date(elem.preSaleStartDateAndTime).setHours(new Date(elem.preSaleStartDateAndTime).getHours() + 18)} />
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <ComingPoolCard tier={3} {...elem} allcation={elem.tier3Allocation} max={elem.tier3MaxAmountPerUserInBNB}
                    min={elem.tier3MinAmountPerUserInBNB}
                    preSaleStartDateAndTime={tier3Date.toISOString()} />
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <ComingPoolCard tier={4} {...elem} allcation={elem.tier4Allocation} max={elem.tier3MaxAmountPerUserInBNB}
                    min={elem.tier4MinAmountPerUserInBNB}
                    preSaleStartDateAndTime={tier4Date.toISOString()} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section className="featured-pool-closed">
        <div className="auto-container">
          <h1>Pools Closed</h1>
          {closedPool.map((elem, index) => {
            const { id } = elem
            const t1 = 1; const t2 = 2; const t3 = 3; const t4 = 4;
            return (
              <div className="row main-pool-featured">
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <Link to={'/closepool/' + id + '/' + t1}>
                    <ClosedPoolCard {...elem} tier={1} />
                  </Link>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <Link to={'/closepool/' + id + '/' + t2}>
                    <ClosedPoolCard tier={2} {...elem} />
                  </Link>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <Link to={'/closepool/' + id + '/' + t3}>
                    <ClosedPoolCard tier={3} {...elem} />
                  </Link>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <Link to={'/closepool/' + id + '/' + t4}>
                    <ClosedPoolCard tier={4} {...elem} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Landing