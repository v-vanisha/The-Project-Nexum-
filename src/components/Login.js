import React from "react";
import "./login.css";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import nexumLogo from "../assets/nexumLogo.jpg";
import nexumImg2 from "../assets/nexumImg2.jpg";
import nexumImg3 from "../assets/nexumImg3.jpg";
import nexumImg4 from "../assets/nexumImg4.jpg";
import nexumImg5 from "../assets/nexumImg5.jpg";
import nexumImg6 from "../assets/nexumImg6.jpg";
import nexumImg7 from "../assets/nexumImg7.jpg";
import nexumImg8 from "../assets/nexumImg8.jpg";
import nexumImg9 from "../assets/nexumImg9.jpg";
import nexumImg10 from "../assets/nexumImg10.jpg";
import nexumImg11 from "../assets/nexumImg11.jpg";
import nexumImg12 from "../assets/nexumImg12.jpg";
import nexumImg13 from "../assets/nexumImg13.jpg";
import { AuthContext } from "../context/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  // console.log(user);
  const handleClick = async () => {
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setLoading(false);
    //   navigate("/");
    } catch (err) {
      
      setError(err.message);
    //   console.log(err);
    //   console.log(typeof(error));
      // console.log(error);
      setTimeout(() => {
        setError("");
      }, 3000);
      
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="login-container">
        {/* leftBox */}
        {/* This div is for fixed tablet image */}
        <div
          className="carbg"
          style={{ marginRight: "190px", paddingLeft: "10px" }}
        >
          {/* This div is for caraousel */}
          <div className="car">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={2000}
              showArrows={false}
              showIndicators={false}
              showThumbs={false}
              width={306}
              height={400}
              autoFocus={true}
            >
              <img style={{ height: "400px" }} src={nexumImg3} />
              <img style={{ height: "410px" }} src={nexumImg4} />
              <img style={{ height: "410px" }} src={nexumImg5} />
              <img style={{ height: "400px" }} src={nexumImg6} />
              <img style={{ height: "410px" }} src={nexumImg7} />
              <img style={{ height: "410px" }} src={nexumImg8} />
              <img style={{ height: "410px"}} src={nexumImg9} />
              <img style={{ height: "410px"}} src={nexumImg10} />
              <img style={{ height: "410px" }} src={nexumImg11} />
              <img style={{ height: "410px" }} src={nexumImg12} />
              <img style={{ height: "410px" }} src={nexumImg13} />
            </Carousel>
          </div>
        </div>

        {/* rightBox */}
        <div className="right">
          {/* loginPortion */}
          <div className="login-card">
            {/* put the logo */}
            <img src={nexumLogo} />
            {/* Enter the email */}
            <TextField
              size="small"
              margin="dense"
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Enter the password */}
            <TextField
              size="small"
              margin="dense"
              fullWidth
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* showing the error */}
            {error != "" && <div style={{ color: "red" }}>{error}</div>}

            {/* login button */}
            <Button
              variant="contained"
              fullWidth
              style={{ marginTop: "0.8rem" }}
              onClick={handleClick}
            >
              Login
            </Button>

            {/* Forgot password */}
            <div style={{ color: "blue", marginTop: "0.5rem" }}>
            <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
            Forgot Password ?
            </Link>
              
            </div>
          </div>
          {/* login card ended */}

          {/* lower box */}
          <div className="login-bottom-card">
            Don&apos;t Have an Account ?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
