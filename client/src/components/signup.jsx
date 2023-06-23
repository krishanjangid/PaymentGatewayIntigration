import { useState } from "react";
import './Signup.css';
import axios from "axios";



export default function Signup() {
  const [validationError, setValidationError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    mobile: "",
    file: "",
  });


  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  }

function handleFileChange(e) {
    setFormData({
      ...formData,
      file: e.target.files[0]
    })
}
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if (!formData.name) {
        setValidationError("Name is required");
      } else if (!formData.email) {
        setValidationError("Email is required");
      } else if (!formData.password) {
        setValidationError("Password is required");
      } else if (!formData.dob) {
        setValidationError("Date of Birth is required");
      } else if (!formData.mobile) {
        setValidationError("Mobile number is required");
      } else if (!formData.file) {
        setValidationError("File is required");
      } 
      else {
        setValidationError(""); 
        const finalfromData = new FormData();
        finalfromData.append("name", formData.name);
        finalfromData.append("email", formData.email);
        finalfromData.append("password", formData.password);
        finalfromData.append("dob", formData.dob);
        finalfromData.append("mobile", formData.mobile);
        finalfromData.append("file", formData.file);
  
        
        const { data } = await axios.post(
          `http://localhost:4000/api/v1/users/signup`,
          finalfromData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
      }
    }catch(error){
      if(error.response && error.response.data){
        setValidationError(error.response.data.message);
    }

    }
    }
  
  console.log(formData);
  return (
    <>
      <div className="card">
      <form onSubmit={handleSubmit} className="my-form">
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Your Name"
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Example@gmail.com"
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="dob">Dob:</label>
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      placeholder="DOB"
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="mobile">+91</label>
    <input
      type="number"
      name="mobile"
      value={formData.mobile}
      onChange={handleChange}
      placeholder="7014136412"
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="file">Choose File:</label>
    <input
      type="file"
      name="file"
      onChange={handleFileChange}
      className="form-input"
    />
  </div>
  <div className="form-group">
    <button type="submit" className="submit-button">Submit</button>
  </div>
</form>
      </div>
      {validationError && (
        <div className="alert">
          <p>{validationError}</p>
        </div>
      )}
    </>
  );
}
