import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  // States
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  // Use Axios lib to send requests to an API
  const addEmployee = () => {
    // POST to the /create end point
    // endpoint, body
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      // then is a promise that calls a callback function

      // Clear the inputs
      setName("");
      setAge(0);
      setCountry("");
      setPosition("");
      setWage(0);

      // Add it straight to the employeeList
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  // Axios lib GET req
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      // set the Employee List state var
      setEmployeeList(response.data);
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          // going through every element in the list and if the condition is met then return
          return val.id != id;
        })
      );
    });
  };

  // PUT req need to pass an object also
  // Pass id from val.id from database
  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id,
    }).then((response) => {
      // Change the wage of the id that was changed
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        ></input>
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        ></input>
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        ></input>
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        ></input>
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="divider"></div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {/* mapping through all the entries in the list */}
        {employeeList.map((val, key) => {
          return (
            <div className="employeeDetails">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Postion: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="New Wage"
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
