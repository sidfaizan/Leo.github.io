import React, { useState, useEffect} from 'react'
import './index.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { Finalize } from "../../hooks/PoolDataFetcher";
import axios from 'axios';
const Projects = () => {
    const {Final}=Finalize()
    const [searchTerm, setSearchTerm] = useState('')
    const [data, getDate] = useState([]);
    const getAlldata = async () => {
        try {

            await axios.get("http://ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/all")
                .then((response) => {

                    if (response.data.status) {
                        getDate(response.data.msg)
                    }
                });

        }
        catch (err) {
            // eslint-disable-next-line no-console
            // console.log(err);
            // alert("Invalid Address")
        }
    }
    const [currentAddress,setCurrentAddress] = useState({
        id:'',
        address:'',
    });
    // const FinalFun=()=>{
        
        // }
        useEffect(() => {
            async function doFinal(){
                const data = await Final(currentAddress)
                     console.log(data)

            }

            doFinal()
    }, [currentAddress])

    React.useEffect(() => {
        getAlldata();
    }, [])

    // render() {
    return (
        <div className='landing-nft projects'>

            <Navbar />

            <section className="header-section submit-projects" style={{ backgroundImage: `url(${require("../../static/images/submit-form/background-projectss.png")})` }}>
                <img src={require("../../static/images/landing-leocorn/background-main-head.png")} className="main-heads-one" alt="" />
                <div className="auto-container">
                    <div className="submit-project">
                        <div className="inner-submit-upper-div">
                            <div className="row  ">
                                <div className="searchbar">
                                    <h1>Projects</h1>
                                    <div className="searchContainer">
                                        <i class="fa fa-search " aria-hidden="true"></i>
                                        <input className="searchBox" type="search"
                                            name="search" placeholder="Search Pool" onChange={(e) => setSearchTerm(e.target.value)} />
                                    </div>
                                    <div className="drop-down-single-line">
                                        <div class="dropdown show">
                                            <a class=" " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sort By<span><i class="fa fa-caret-down" aria-hidden="true"></i></span>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                                <a class="dropdown-item" href="#">Pending</a>
                                                <a class="dropdown-item" href="#">Approved</a>
                                                <a class="dropdown-item" href="#">Rejected</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="buttons-filter">
                                            <button type="button">
                                                <span><i class="fa fa-filter" aria-hidden="true"></i></span> Filter
                                            </button>
                                        </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="inner-lower-div">
                            <div class="projects-table-main">
                                <div class="table-responsive button-table">
                                    <table class="table table-clr table-striped text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col"> Project Name </th>
                                                <th scope="col"> Finalize </th>
                                                {/* <th scope="col"> Contact Person </th> */}
                                                <th scope="col"> contract address </th>
                                                <th scope="col"> STATUS </th>
                                                <th scope="col"> DETAILS </th>
                                            </tr>
                                        </thead>
                                        <tbody className="main-t-body-text" >

                                            {data.filter((val) => {
                                                if (searchTerm === "") {
                                                    return val
                                                } else if (val.contactPersonName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                    return (
                                                        <tr >
                                                            <td className='text-left'><img className='balance-table-img' src={val.logoURL} alt="" />{val.projectName} </td>
                                                            <td className="button-details">
                                                                {
                                                                    val.preSaleEndDateAndTime && new Date(val.preSaleEndDateAndTime) < new Date() && val.statusOfApplication === 'Approved' ? <button className='disabled1' >Finalize</button> : <button className='disabled2' >Finalize</button>
                                                                }
                                                            </td>
                                                            {/* <td className='text-left-normal'>{val.contactPersonName}</td> */}
                                                            <td className='text-left-normal'>{val.contractAddress}</td>
                                                            <td className='text-green-approved'>{val.status}</td>
                                                            <td className="button-details">
                                                                <Link className='' to='/project-details'>{val.detail}</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            }).map((elem, key) => {
                                                const { id } = elem;
                                                return (
                                                    <tr index={key}>
                                                        <td className='text-left'><img className='balance-table-img' src={elem.logoURL} style={{ width: 40 }} alt="" /> {elem.projectName}</td>
                                                        <td className=''>
                                                            {
                                                                elem.preSaleEndDateAndTime && new Date(elem.preSaleEndDateAndTime) < new Date() && elem.statusOfApplication === 'Approved' ? <button className={elem.finalizeSaleDone === true ? 'green1' : 'disabled1'} onClick={() => setCurrentAddress({id : elem.id, address : elem.contractAddressDeployed})}>Finalize</button> : <button className='disabled2' >Finalize</button>
                                                            }

                                                        </td>
                                                        {/* <td className='text-left-normal'>{elem.contactPersonName}</td> */}
                                                        <td className='text-left-normal'>{elem.contractAddress}</td>
                                                        {/* <td className='text-green-approved'>{elem.status}</td> */}

                                                        <td className={elem.statusOfApplication == 'Pending' ? 'text-green-pending' : elem.statusOfApplication == 'Approved' ? 'text-green-approved' : 'text-green-rejected'}>{elem.statusOfApplication}</td>
                                                        <td className="button-details">
                                                            <Link className='' to={'/project-details/' + id}>Detail</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }

                                            {/*                                                 
                                           
                                                <tr>
                                                    <td className='text-left'><img className='balance-table-img' src={require("../../static/images/submit-form/table-icon-image-two.png")} alt="" /> PURIFI</td>
                                                    <td className='text-left-2nd'><a href="#">fanadise.com </a></td>
                                                    <td className='text-left-normal'>Terrell Vargas</td>
                                                    <td className='text-left-normal'>0x8E9788D2B3288016...</td>
                                                    <td className='text-green-rejected'>Rejected</td>
                                                    <td className="button-details">
                                                        <Link className='' to='/project-details'>Detail</Link>
                                                    </td>
                                                </tr> */}
                                        </tbody>
                                    </table>
                                    <div className="load-more-button">
                                        <button typr="button">Load More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default Projects;

