
import React, { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core'
import './index.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ClaimTokens, ClaimVestedToken, VestedPeriod, Contribute } from '../../hooks/PoolDataFetcher';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
const ClosePool = (props) => {
    const [show, setshow] = useState(false);
    const tier = props.match.params.tier;
    const [tierData, setTierData] = useState({ maxValue: '', minValue: '', })
    const [data, setData] = useState({
        logo: '', name: '', description: '', website: '', twitter: '', symbol: '',
        telegram: '', medium: '', discard: '', price: '', tokenSale: '', time: '', tokenAddress: ''
    })

    // const seperate = new Date(data.time);
    //  let year = seperate.getFullYear();
    //  let month = seperate.getMonth() + 1;
    //  let  dt = seperate.getDate();
    //  let hours=seperate.getHours();
    //  let minutes= seperate.getMinutes();
    //  let s= seperate.getSeconds();
    //  let ampm = hours >= 12 ? 'PM' : 'AM';
    //  hours = hours % 12;
    //  hours = hours ? hours : 12;
    //  minutes = minutes < 10 ? '0'+minutes : minutes;
    //  let strTime = hours + ':' + minutes + ':' + s + ' '+ ampm;
  
    //  if (dt < 10) {
    //     dt = '0' + dt;
    //   }
    //   if (month < 10) {
    //     month = '0' + month;
    //   }
      

    // const finalTime=year+'-' + month + '-'+ dt +' '+ hours + ':' + minutes + ':' + s + ' '
    const { login } = useAuth();
    const { account } = useWeb3React();
    const { claimToken } = ClaimTokens(data.tokenAddress)
    const { vestedClaim } = ClaimVestedToken(data.tokenAddress);
    const { vestingPeriod } = VestedPeriod(data.tokenAddress)
    const { tier1Con } = Contribute(data.tokenAddress);
    const [TierContribute, setTierContribute] = useState('0');
    const contribute = useCallback(async (e) => {
        if (account) {
            try {
                const tier1 = await tier1Con();
                console.log("tier1", tier1)
                if (tier == 1) { setTierContribute(tier1.tier1Contribute) }
                if (tier == 2) { setTierContribute(tier1.tier2Contribute) }
                if (tier == 3) { setTierContribute(tier1.tier3Contribute) }
                if (tier == 4) { setTierContribute(tier1.tier4Contribute) }
            }
            catch (err) {
                return false;
            }
        }
        else {
            return 0;
        }
    }, [tier1Con])

    const FirstClaimToken = useCallback(async (e) => {
        e.preventDefault();
        if (account) {
            try {

                const claim = await claimToken();
            }
            catch (err) {
                return false;
            }
        }
        else {
            login("injected")
        }
    }, [claimToken])
    const VestedClaimToken = useCallback(async (e) => {
        e.preventDefault();
        if (account) {
            try {
                const claim = await vestedClaim();
            }
            catch (err) {
                return false;
            }
        }
        else {
            login("injected")
        }
    }, [vestedClaim])
    const [claimTime, setClaimTime] = useState('');
    const [period, setPeriod] = useState('')
    const [now, setNow] = useState('');
    const vestedPeriod = useCallback(async (e) => {
        if (data.tokenAddress) {
            try {
                const period = await vestingPeriod();
                setPeriod(period * 1000);
                const now = Date.now();
                setNow(now)
                const locatime = new Date(period * 1000)
                const time = locatime.toGMTString()
                setClaimTime(time)
            }
            catch (err) {
                return false;
            }
        }
    }, [vestingPeriod])
    const id = props.match.params.id;
    const GetTierData = async () => {
        try {
            await axios.get("http://ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/" + id)
                .then((response) => {
                    // console.log("response========>",response)
                    if (tier == 1) {
                        let max1 = response.data.msg.tier1MaxAmountPerUserInBNB;
                        let min1 = response.data.msg.tier1MinAmountPerUserInBNB;
                        setTierData({ maxValue: max1, minValue: min1 })
                    }
                    if (tier == 2) {
                        let max2 = response.data.msg.tier2MaxAmountPerUserInBNB;
                        let min2 = response.data.msg.tier2MinAmountPerUserInBNB;
                        setTierData({ maxValue: max2, minValue: min2 })
                    }
                    if (tier == 2) {
                        let max2 = response.data.msg.tier3MaxAmountPerUserInBNB;
                        let min2 = response.data.msg.tier3MinAmountPerUserInBNB;
                        setTierData({ maxValue: max2, minValue: min2 })
                    }
                    if (tier == 3) {
                        let max2 = response.data.msg.tier3MaxAmountPerUserInBNB;
                        let min2 = response.data.msg.tier3MinAmountPerUserInBNB;
                        setTierData({ maxValue: max2, minValue: min2 })
                    }
                    if (tier == 4) {
                        let max2 = response.data.msg.tier4MaxAmountPerUserInBNB;
                        let min2 = response.data.msg.tier4MinAmountPerUserInBNB;
                        setTierData({ maxValue: max2, minValue: min2 })
                    }
                    let logo = response.data.msg.logoURL;
                    let name = response.data.msg.projectName;
                    let description = response.data.msg.projectDescription;
                    let symbol = response.data.msg.symbol;
                    let website = response.data.msg.websiteLink;
                    let twitter = response.data.msg.twitterLink;
                    let telegram = response.data.msg.telegramlink;
                    let medium = response.data.msg.mediumLink;
                    let discard = response.data.msg.discrodLink;
                    let price = response.data.msg.tokenPriceInBNB;
                    let tokensale = response.data.msg.tokenPriceInBNB;
                    let time = response.data.msg.preSaleStartDateAndTime;
                    let tokenAddress = response.data.msg.contractAddressDeployed;
                    setData({ logo: logo, name: name, description: description, symbol: symbol, website: website, twitter: twitter, telegram: telegram, medium: medium, discard: discard, price: price, tokenSale: tokensale, time: time, tokenAddress: tokenAddress })
                });
        }
        catch (err) {
            return false;
        }
    }
    useEffect(() => {
        GetTierData();
        contribute();
        vestedPeriod()
    }, [account, id])

    return (
        <div className='landing-nft main-pool'>
            <Navbar />
            <section className="header-section main-pool">
                <img src={require("../../static/images/landing-leocorn/background-main-head.png")} className="main-heads-one" alt="" />
                <div className="auto-container">
                    <div className="row main-pool-page">
                        <div className="col-xl-5 col-lg-4 col-md-12 col-12">
                            <div className="main-left-side">
                                <div className="upper">
                                    <div className="left-inner">
                                        <div className="image">
                                            <img src={data.logo} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                                        </div>
                                        <div className="name-socials">
                                            <h1>{data.name}</h1>
                                            <div className="socials">
                                                <a className='linkss' href={`https://${data.website}`} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page1.png")} alt="" /></a>
                                                <a className='linkss' href={`https://${data.twitter}`} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page4.png")} alt="" /></a>
                                                <a className='linkss' href={`https://${data.telegram}`} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page3.png")} alt="" /></a>
                                                {data.medium ?
                                                    <a className='linkss' href={`https://${data.medium}`} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page5.png")} alt="" /></a> : ""
                                                }
                                                {data.discard ?
                                                    <a className='linkss' href={`https://${data.discard}`} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page2.png")} alt="" /></a> : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-inner">
                                        <button className="button-one" type="button">CLOSED</button>
                                        <button className="button-two" type="button">Tier {tier}</button>
                                    </div>
                                </div>
                                <div className="para">
                                    <p className="para-one">{data.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-8 col-md-12 col-12 offset-xl-0   offset-0">
                            <div className="main-right-side">
                                <div className="wallet-balance">
                                    <div className="wallet-balancess">
                                        <h6>Your Current Contribution</h6>
                                        <div className="image-text">
                                            <img src={require("../../static/images/submit-form/coin-bnb.png")} alt="" />
                                            <h4>{TierContribute / (10 ** 18)} BNB</h4>
                                        </div>
                                        <div className="image-text">
                                            <img src={data.logo} style={{ width: 30, height: 30, borderRadius: '50%', marginTop: 5 }} alt="" />
                                            <h4>{(TierContribute / (10 ** 18)) * (data.price)} {data.symbol}</h4>
                                        </div>
                                    </div>
                                    <hr className="hr-submit-form"></hr>
                                    <div className="form-bnb">
                                        <div style={{ fontSize: 16, textAlign: 'center', fontWeight: 600 }}>
                                            <p style={{ color: 'green' }}>Presale Ended!You can reedem 60% of<br />
                                                your tokens now.
                                            </p>
                                        </div>
                                        <div className="buttons">
                                            <button type="button" className="vested_btn" onClick={FirstClaimToken}>REDEEM</button>
                                        </div>

                                        <div style={{ fontSize: 16, textAlign: 'center', marginTop: 20, fontWeight: 600 }}>
                                            <p style={{ color: 'green' }}>You can reedem 40% of Your tokens<br />
                                                on {claimTime}
                                            </p>
                                        </div>
                                        <div className="buttons">
                                            <button type="button" className={now > period ? "vested_btn" : "vested_btn1"} onClick={VestedClaimToken}>REDEEM</button>
                                        </div>
                                        {/* ------------------Joinnning Pool MODAL----------------- */}
                                        <Modal isOpen={show} toggle={props.toggleBuyWallet} className="register-modal joining-pool-modal">
                                            <ModalHeader toggle={props.toggleBuyWallet}>
                                                <button type="button" class="close" data-dismiss="modal" onClick={() => setshow(false)} aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </ModalHeader>
                                            <ModalBody className="modal-body">
                                                <div className="container main-divs">
                                                    <h1>Joining the pool</h1>
                                                    <div className="transaction-approved">
                                                        <h2 className="main-h">Transaction approved!</h2>
                                                        <h3 className="main-hthree">You have successfully joined this pool</h3>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="pool-details">
                                    <div className="poor-detailss">
                                        <h6>Pool Details</h6>
                                        <p>Price: {data.price} BNB = 100,000,000 ${data.symbol}</p>
                                        <p>For Sale:{data.tokenSale} ${data.symbol}</p>
                                        <p>Max contribution: {tierData.maxValue} BNB</p>
                                        <p>Min contribution: {tierData.minValue} BNB</p>
                                    </div>
                                    <div className="calender">
                                        <h1>CLOSED</h1>
                                        <div className="main-calender">
                                            <h1>0 <br></br><span>DAYS</span></h1>
                                            <h1>0 <br></br><span>HRS</span></h1>
                                            <h1>0 <br></br><span>MIN</span></h1>
                                            <h1>0 <br></br><span>SEC</span></h1>
                                        </div>
                                        <p>{data.time.split('Z')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
export default ClosePool

