import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import students from "../pages/data/students";
import styles from "../styles/newlayout.module.css";
import Navbar from '@/components/Navbar'
import { connectToDatabase } from "../pages/utils/mongodb";



const newlayout = ({formDocs}) => {
  const [stname, setStname] = useState();
  const [message, setMessage] = useState()
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    nationalId: "",
    grade: "",
    address: "",
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    
  };

  const handleSubmit = async(event) => {
    event.preventDefault()
    // fields check
    //if (!fname || !dob || !nationalId || !grade || !address) return setError('All fields are required');

    // post structure
    let post = {
       name: formData.name,
        dob: formData.dob,
        nationalId: formData.nationalId,
        grade: formData.grade,
        address: formData.address,
    };
    // save the post
    let response = await fetch('/api/addform/', {
      method: 'POST',
      body: JSON.stringify(post),
  });
  // get the data
  let data = await response.json();

  if (data.success) {
      // reset the fields
      
      // set the message
      return setMessage(data.message);
  } else {
      // set the error
      return setError(data.message);
  }
  };
  return (
    
      <Row  style={{background: '#f2f2f2'}}> 
      <Navbar/>
        <Col className={styles.datadev}>
          <strong><p>{message}</p></strong>
          <h3>Customers Information</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              National ID:
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Grade:
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
          )
        </Col>
        <Col >
        <div className={styles.customerdev}>
          
          <h2>Customers Names</h2>
          <select onChange={(e) => setStname(e.target.value)}>
            {students.map((student, i) => (
              <option key={i}>{student.name}</option>
            ))}
          </select>
          <p>{stname}</p>
          </div>
          <div>
            {formDocs.map((doc,i)=> (
              <Row>
                
              <h3>{doc.name}</h3>
              <p>{doc.dob}</p>
              <p>{doc.nationalId}</p>
             
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    
  );
};

export default newlayout;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const data = await db.collection("formdata").find({}).toArray();
  const formDocs = JSON.parse(JSON.stringify(data));
  console.log({ formDocs });
  return {
    props: {
      formDocs: formDocs,
    },
  };
}
