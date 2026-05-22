import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const [showPsw, setshowPsw] = useState(false);

  const handleSubmit = (a) => {
    a.preventDefault();
    console.log(details);
    if (details.name != "" && details.email != "" && details.password != "") {
      if (!details.email.includes("@") && !details.email.includes(".")) {
        toast.warning("invalid email");
      } else {
        toast.success("Register Successfully");
        setDetails({
          name: "",
          password: "",
          email: "",
        });
        setTimeout(()=>{
          navigate("/login")
        },3000)
      }
    }
  };
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setDetails({
      name: "",
      email: "",
      password: "",
    });
  };

  const handlePassword = () => {
    let result = showPsw ? false : true;
    setshowPsw(result);
  };

  return (
    <div className="p-5 bg-danger-subtle">
      <form
        onSubmit={handleSubmit}
        className="form mx-5 border border-primary p-3"
        action=""
      >
        <fieldset>
          <div className="row m-3">
            <h1 className="text-center">Register</h1>
          </div>

          <div className="row my-2">
            <div className="col">
              <label htmlFor="">Name:</label>
            </div>
            <div className="col">
              {" "}
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter Name"
                name="name"
                value={details.name}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col">
              <label htmlFor="">Email:</label>
            </div>
            <div className="col">
              {" "}
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter Email"
                name="email"
                value={details.email}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col">
              <label htmlFor="">Create Password:</label>
            </div>
            <div className="col">
              <input
                type={showPsw ? "password" : "text"}
                onChange={handleChange}
                placeholder="Enter password"
                name="password"
                value={details.password}
              />{" "}
              <span  onClick={handlePassword}>{showPsw ? "👁️" : "🙈"}</span>
            </div>
          </div>

          <div className="row my-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <div className="row">
            <button
              type="reset"
              onClick={handleReset}
              className="btn btn-warning"
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
