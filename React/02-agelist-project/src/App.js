import React, { useState } from "react";
import { Form } from "./components";
import "./styles/styles.css";
import List from "./components/List";

const App = () => {
  const [newUser, setNewUser] = useState([]);

  const addExpenseHandler = (expense) => {
    setNewUser((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <section className="App-Section">
      <Form onAddUser={addExpenseHandler} />
      <List newUser={newUser} />
    </section>
  );
};

export default App;
