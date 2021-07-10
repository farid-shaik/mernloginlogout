import React, { useEffect, useState } from 'react';
import profile1 from "../images/profile1.png";
import { useHistory } from "react-router-dom";



const About = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);
            

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
        console.log(err);
        history.push('/login');
        }
    };



    useEffect(() => {
        callAboutPage();
    }, []);




    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={profile1} alt="profile" />
                            </div>
                            
                        </div>

                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{ userData.name}</h5>
                                <h6>web Developer</h6>
                                <p className="profile-rating mt-3 mb-5">RANKINGS: <span>1/10</span></p>


                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                                    </li>
                                </ul>


                            </div>
                        </div>

                        
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>

                    </div>


                    <div className="row">
                        {/* left side url */}
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="https://github.com/manutdmohit/merncompleteloginlogout" target="_thapa">Github</a> <br />
                                <a href="https://github.com/manutdmohit/merncompleteloginlogout" target="_thapa">MERN login logout</a> <br />
                                <a href="https://github.com/manutdmohit/merncompleteloginlogout" target="_thapa">MERN login logout</a> <br />
                                <a href="https://github.com/manutdmohit/merncompleteloginlogout" target="_thapa">MERN login logout</a> <br />
                                <a href="https://github.com/manutdmohit/merncompleteloginlogout" target="_thapa">MERN login logout</a> <br />
                                <a href="https://github.com/manutdmohit/merncompleteloginlogout" target="_thapa">MERN login logout</a> <br />
                            </div>
                        </div>


                        {/* right side data toggle */}

                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            {/* <label >User ID</label> */}
                                            <h5>User ID</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <p>76e76w65w76</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">   
                                        <div className="col-md-6">
                                            {/* <label >name</label> */}
                                            <h5>Name</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <p>vinod thapa</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            {/* <label >User ID</label> */}
                                            <h5>User ID</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <p>76e76w65w76</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            {/* <label >User ID</label> */}
                                            <h5>User ID</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <p>76e76w65w76</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">   
                                        <div className="col-md-6">
                                            {/* <label >name</label> */}
                                            <h5>Name</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <p>vinod thapa</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            {/* <label >User ID</label> */}
                                            <h5>User ID</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>

                                    


                                </div>
                            </div>
                        </div>

                        

                    </div>
                    
                </form>
            </div>
        </>
    );
}

export default About;
