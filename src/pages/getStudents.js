import { useState, useEffect } from "react";
import styles from "../styles/getStudents.module.css";
import students from "../pages/data/students";
import { NavLink } from "react-bootstrap";
import Navbar from '@/components/Navbar' 

const getStudents = () => {
  const [stname, setStname] = useState();

  return (
    
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.datadev}>
        <h2>Welcome</h2>
        <h2>Students Names</h2>
        <select onChange={(e) => setStname(e.target.value)}>
          {students.map((student, i) => (
            <option key={i}>{student.name}</option>
          ))}
        </select>
        <p>{stname}</p>
      </div>
    </div>
  );
};

export default getStudents;
