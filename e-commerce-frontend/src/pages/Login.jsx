import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; // Make sure toast styles are imported
import axios from "axios";
const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    otp: "",
  });

  const navigate = useNavigate();
  const [mailOtp, setMailOtp] = useState(""); // Fixed: Removed duplicate declaration lower down

  // Function to fetch input values
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  // Fixed: Completed the logic, fixed spelling errors, closed the block properly
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!loginDetails.username || !loginDetails.password || !loginDetails.otp) {
        toast.error("Please fill in all fields");
        return;
      }

      // Verify OTP and password
      if (Number(mailOtp) === Number(loginDetails.otp)) {

        const response = await axios.post("http://localhost:5000/user/login", { username: loginDetails.username, password: loginDetails.password })
        toast.success("Login Successful!");
        console.log(response);

        // Simulating the token set up so your App.js Protected Route lets them in
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        setTimeout(() => {
          navigate("/home");
        }, 3000)
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login.");
    }
  };

  // Fixed: Fixed 'Data' to 'Date', fixed variable casings, and closed handleLogin scope
  const generateOtp = async () => {
    try {
      if (!loginDetails.username) {
        toast.error("Please enter your email username first.");
        return;
      }

      let generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generates a reliable 6-digit OTP
      let time = new Date(); // Fixed: changed 'Data' to 'Date'
      let expiredTime = `${time.getHours()}:${time.getMinutes() + 15}:00`; // Fixed: standardized casing

      setMailOtp(generatedOtp);

      let formData = {
        email: loginDetails.username,
        otp: generatedOtp,
        time: expiredTime // Fixed: standardized casing
      };

      await emailjs.send(
        "service_tud01vj",
        "template_4faxopu",
        formData,
        "DF6Ur_nxC9Twf65j9"
      );

      toast.success("OTP was sent to your email successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate the OTP.");
    }
  };

  // Fixed: Added the missing reset handler function
  const handleReset = () => {
    setLoginDetails({ username: "", password: "", otp: "" });
    setMailOtp("");
  };

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <Form onSubmit={handleLogin}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Username (Email):</Form.Label>
            <Form.Control
              type="email"
              placeholder='Enter your email'
              name='username'
              onChange={handleChange}
              value={loginDetails.username}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name='password' // Fixed: corrected typo 'passowrd'
              onChange={handleChange}
              value={loginDetails.password}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3 align-items-end">
          <Col xs={6}>
            <Button type="button" onClick={generateOtp} className="w-100 btn btn-info">
              Generate OTP
            </Button>
          </Col>
          <Col xs={6}>
            <Form.Control
              type="number"
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              value={loginDetails.otp}
              required
            />
          </Col>
        </Row>
        {/* forget password row  */}
        <Row>
          <Link to="/forget">forget password</Link>
        </Row>
        {/* Action Button Row */}
        <Row className="mt-4">
          <Col>
            <Button type="submit" className="w-100 btn btn-primary">Signin</Button>
          </Col>
          <Col>
            <Button onClick={handleReset} type="button" className="w-100 btn btn-warning">
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Login;