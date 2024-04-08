import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

const Signup = () => {
    let navigate = useNavigate()
  const [credentials, setcredentials] = useState({ name : "", email: "", password: "" });

  useEffect(() => {
    if(localStorage.getItem('auth')){
      navigate("/")
    }

  }, [])

  const onchagehandle = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    console.log(credentials);
    await fetch("http://localhost:5001/api/auth/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name : credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("auth", data["authToken"]);
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="row d-flex align-items-center justify-content-center my-5" >
        <div className="col-6 p-5">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={onSubmitHandle}>
                        <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            onChange={onchagehandle}
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={onchagehandle}
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={onchagehandle}
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                        </div>
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Signup;
