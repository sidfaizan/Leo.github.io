import React, { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core'
import './index.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PoolDataFetcher from '../../hooks/PoolDataFetcher';
import { Contribute } from '../../hooks/PoolDataFetcher';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Pool = (props) => {
    const [amount, setAmount] = useState(0)
    const [show, setshow] = useState(false);
    const tier = props.match.params.tier;
    const [tierData, setTierData] = useState({ maxValue: '', minValue: '', })
    const [data, setData] = useState({
        logo: '', name: '', description: '', website: '', twitter: '', symbol: '',
        telegram: '', medium: '', discard: '', price: '', tokenSale: '', time: '', tokenAddress: ''
    })
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    function timer(time) {
        var now = new Date()
        var diff = time.getTime() - now.getTime()
        if (diff <= 0) {
            return;
        }
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor(diff / (1000 * 60 * 60));
        var mins = Math.floor(diff / (1000 * 60));
        var secs = Math.floor(diff / 1000);
        var d = days;
        var h = hours - days * 24;
        var m = mins - hours * 60;
        var s = secs - mins * 60;
        setDay(d);
        setHour(h);
        setMin(m);
        setSec(s)
    }
    useEffect(() => {
        timerdata();
    }, [tier])
    const timerdata = async () => {
        try {
            axios.get("http://ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/" + id)
                .then((response) => {
                    var time = new Date(response.data.msg.preSaleStartDateAndTime);
                    if (tier == 1) {
                        time.setHours(new Date(response.data.msg.preSaleStartDateAndTime).getHours() + 8)
                    } else if (tier == 2) {
                        time.setHours(new Date(response.data.msg.preSaleStartDateAndTime).getHours() + 22)
                    } else if (tier == 3) {
                        time.setHours(new Date(response.data.msg.preSaleStartDateAndTime).getHours() + 24)
                        time.setMinutes(new Date(response.data.msg.preSaleStartDateAndTime).getMinutes() + 10)
                    } else {
                        time = new Date(response.data.msg.preSaleEndDateAndTime)
                    }
                    setInterval(() => {
                        timer(time);
                    }, 1000)
                });
        }
        catch (err) {
            // console.log("Error in timer",err);
            return false;
        }

    }
    const { login } = useAuth();
    const { account } = useWeb3React();

    const { onTransfer } = PoolDataFetcher(data.tokenAddress, amount);
    const { tier1Con } = Contribute(data.tokenAddress);
    const [TierContribute, setTierContribute] = useState('0');
    console.log("TierContribute", TierContribute)
    const contribute = useCallback(async (e) => {
        if (account && data.tokenAddress) {
            try {
                const tier1 = await tier1Con();
                // console.log("tier1",tier1)
                if (tier == 1) { setTierContribute(tier1.tier1Contribute) }
                if (tier == 2) { setTierContribute(tier1.tier2Contribute) }
                if (tier == 3) { setTierContribute(tier1.tier3Contribute) }
                if (tier == 4) { setTierContribute(tier1.tier4Contribute) }
            }
            catch (err) {
                return false
            }
        }
        else {
            return 0;
        }
    }, [tier1Con])
    const JoinPool = useCallback(async (e) => {
        e.preventDefault();
        if (account) {
            try {
                if (tier == 1 && amount <= tierData.maxValue && amount >= tierData.minValue) {
                    const pay = await onTransfer();
                }
                else if (tier == 2 && amount <= tierData.maxValue && amount >= tierData.minValue) {
                    const pay = await onTransfer();
                }
                else if (tier == 3 && amount <= tierData.maxValue && amount >= tierData.minValue) {

                    const pay = await onTransfer();
                }
                else if (tier == 4 && amount <= tierData.maxValue && amount >= tierData.minValue) {
                    const pay = await onTransfer();
                }
                else {
                    toast.error('Invalid Value', {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
            }
            catch (err) {
                return false;
            }
        }
        else {
            login("injected")
        }

    }, [onTransfer])
    const id = props.match.params.id;
    const GetTierData = async () => {
        try {
            await axios.get("http://ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/" + id)
                .then((response) => {

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
            // console.log(err);
            return false;
        }
    }
    // const Balance= ()=>{
    //     const testnet = 'https://bsc-dataseed1.defibit.io';
    //     const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    //     const balance= account && web3.eth.getBalance(account).then((res)=>{
    //     setWalletBalance(res/1000000000000000000);
    //      })
    //   }
    useEffect(() => {
        GetTierData();
        contribute();
    }, [account, id, data.tokenAddress])

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
                                        <button className="button-one-one" type="button">LIVE</button>
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
                                        {TierContribute != tierData.maxValue ?
                                            <form>
                                                <div class="form-group">
                                                    <label for="example">Your Contribution</label>
                                                    <input type="number" class="form-control" id="example"
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        aria-describedby="text" placeholder="0.0" />
                                                    <div className="bnb-drop">
                                                        <div className="drop-down-single-line">
                                                            <div class="dropdown show">
                                                                <a class=" " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <span className="image"><img src={require("../../static/images/submit-form/coin-bnb.png")} alt="" /></span>BNB<span className="main-carret"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="you-will-receive">
                                                <span className="span-one">You’ll recieve</span><span className="image">
                                                    <img src={data.logo} alt="" style={{ width: 25, height: 25, borderRadius: '50%', marginLeft: 10 }} /></span><span className="FAN">100,000,000 $FAN</span>
                                            </div> */}
                                                <div className="buttons">
                                                    <button type="button" onClick={JoinPool}>CONTRIBUTE & JOIN POOL</button>
                                                    {/* <ToastContainer/> */}
                                                </div>
                                            </form> :
                                            <div style={{ fontSize: 16, display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                                                <p style={{ color: 'yellow' }}>This Presale is currently in progress</p>
                                            </div>
                                        }
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
                                        <h1>ENDS IN</h1>
                                        <div className="main-calender">
                                            <h1>{day} <br></br><span>DAYS</span></h1>
                                            <h1>{hour} <br></br><span>HRS</span></h1>
                                            <h1>{min} <br></br><span>MIN</span></h1>
                                            <h1>{sec} <br></br><span>SEC</span></h1>
                                        </div>
                                        <p>{data.time}</p>
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
export default Pool

