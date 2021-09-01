// import EventBus from "eventing-bus";
import { connect } from "react-redux";
import React, { Component } from 'react';
// import { TextField } from '@material-ui/core';
// import { Send, CheckCircle, Info, Error, Done, Facebook, Twitter, Instagram, LinkedIn, LiveTvRounded } from '@material-ui/icons';
// import OwlCarousel from 'react-owl-carousel';
import './index.css';
// import { Link } from 'react-router-dom';
// import Navbar from '../../components/navbar';
// import Footer from '../../components/footer';
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };



    render() {
        return (
            <div className='landing-nft sigin-form'>
                <section className="header-section sigin-projects" style={{ backgroundImage: `url(${require("../../static/images/submit-form/backend-header.png")})` }}>

                    <div className="auto-container">
                        <div className="row">
                            <div className="col-lg-6  col-md-12 col-sm-12 offset-lg-3 offset-md-0  offset-sm-0 col-12 offset-0 main-div">
                                <div className="main-div-image">
                                    <img src={require("../../static/images/submit-form/sigin-logo.png")} className="main-logo-image" alt="" />
                                </div>
                                <div className="image-form">
                                    <div className="inner-div">
                                        <h1>Sign In</h1>
                                        <p>Enter your credentials to access your account</p>

                                        <form>
                                            <div className="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label for="exampleusername">Username</label>
                                                        <input type="text" class="form-control" id="exampleusername" aria-describedby="text" placeholder="Enter username" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label for="examplepassword">Password</label>
                                                        <input type="text" class="form-control" id="examplepassword" aria-describedby="text" placeholder="Enter password" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-12">
                                                    <div class="form-check">
                                                        <input className="checkcolor" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                        Remember me
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-12">
                                                    <div className="buttons">
                                                        <button type="button">Sign In</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


const mapDispatchToProps = {
};

const mapStateToProps = ({ }) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);