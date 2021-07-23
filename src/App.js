import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // const { name, email, phone } = newUser;
  const getData = async () => {
    const res = await axios.get("http://localhost:3001/users");
    setUsers(res.data);
  };
  useEffect(() => {
    getData();
  }, [users]);

  const inputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    await axios.post("http://localhost:3001/users", newUser);
    console.log(newUser);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
  };

  return (
    <div className="App">
      <h1>Users List :</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <h1>Add User</h1>
      <input
        type="text"
        placeholder="Enter Name"
        name="name"
        value={newUser.name}
        onChange={(e) => inputChange(e)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={newUser.email}
        onChange={(e) => inputChange(e)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Phone"
        name="phone"
        value={newUser.phoen}
        onChange={(e) => inputChange(e)}
      />
      <br />
      <button onClick={() => addUser()}>Add</button>
    </div>
  );
}
