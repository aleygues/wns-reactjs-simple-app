import React, { useState } from "react";
import axios from 'axios';
import { Button, Form, Input, Label, Error } from "./styles/form-elements";

const defaultWilder = { name: '', city: 'Villeurbanne' };

function AddWilder({ onWilderCreated }) {
  const [wilder, setWilder] = useState(defaultWilder);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const createWilder = async () => {
    // send request to server
    setPending(true);
    try {
      const { data } = await axios.post('http://localhost:3552/api/wilders', wilder);
      if (data.success) {
        onWilderCreated();
        setError('');
        setWilder(defaultWilder);
      } else {
        setError(data.message || 'Error occured');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      // create wilder
      if (pending === false) {
        createWilder();
      }
    }}>
      <Label htmlFor="name-input">Name :</Label>
      <Input
        id="name-input"
        type="text"
        placeholder="Type the name"
        value={wilder.name}
        disabled={pending === true}
        onChange={e => setWilder({ ...wilder, name: e.target.value })} />
      <Label htmlFor="city-input">City :</Label>
      <Input
        id="city-input"
        type="text"
        placeholder="Type the city"
        value={wilder.city}
        disabled={pending === true}
        onChange={e => setWilder({ ...wilder, city: e.target.value })} />
      <Button
        disabled={pending === true}>Add</Button>
      {error !== '' && <p>{error}</p>}
      {pending && 'In progress...'}
    </Form>
  );
}

export default AddWilder;
