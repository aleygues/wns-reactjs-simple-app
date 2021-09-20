import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { CardRow, Container, Footer, Header } from "./styles/elements";
import Wilder from "./Wilder";
import AddWilder from "./AddWilder";
import { Button } from "./styles/form-elements";

function App() {
  const [wilders, setWilders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchWilders = async () => {
    try {
      const result = await axios("http://localhost:3552/api/wilders");
      setWilders(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWilders();
  }, []);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        {showForm === true && <AddWilder onWilderCreated={() => fetchWilders()} />}
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide' : 'Show'}</Button>
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {wilders.map((wilder) => (
            <Wilder key={wilder._id} {...wilder} />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2020 Wild Code School</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
