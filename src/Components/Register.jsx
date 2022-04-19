import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Register() {

    const [credentials, setCredentials] = useState({name : "", email : "", password : ""}); 
    let navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("https://movie-info-app-deploy.herokuapp.com/auth/createUser", {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name : credentials.name, email : credentials.email, password :credentials.password})
        }
        );
        const json =  await response.json()
        if(!json.regSuccess){
            toast.error('User Already Exists!', {
                position: "bottom-right",
                theme: "dark",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            navigate('/');
        }
    }

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    return (
        <div className="container">
            <div className="row align-items-center my-5">
                <div className="col">
                    <h1>Movie Information App</h1>
                    <img id="cred-img" src = "https://cdn-icons-png.flaticon.com/512/3163/3163478.png" alt = "movies"></img>

                </div>
                <div className="col cred-box" >
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="text" value={credentials.name} onChange={onChange} name="name" className="form-control" id="inputName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input type="email" value={credentials.email} onChange={onChange} name="email" className="form-control" id="inputEmail" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword1" className="form-label">Password</label>
                            <input type="password" value={credentials.password} onChange={onChange} name="password" className="form-control" id="inputPassword" required />
                        </div>
                        <button type="submit" className="btn btn-primary" >Sign Up</button>
                        <button style={{marginLeft : "5%"}} onClick={() => navigate('/')} className="btn btn-primary" >Back To Sign In</button>

                    </form>


                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Register