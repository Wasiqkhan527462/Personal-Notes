import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { firebaseAuth } from "../firbase-config";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async() => {
    try {
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
    } catch (error) {
        console.log(error)
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  })
  return (
    <Section>
      <div className="container">
        <h1>Signup</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button">
          <button onClick={handleSignIn}>Signup</button>
        </div>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </div>
    </Section>
  );
}
const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
  .container {
    height: 50vh;
    width: 25rem;
    background-color: #2c384a;
    border-radius: 1rem;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    input {
      background-color: #5c5f63a3;
      border: none;
      font-size: 1.2rem;
      padding: 1rem;
      border-radius: 0.3rem;
      color: white;
      &:focus {
        outline: 1px solid;
        outline-color: #f57c00;
        -moz-outline-radius: 0.3rem;
      }
    }
    .button {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      a {
        color: #039be5;
        text-decoration: none;
      }
      button {
        background-color: #f57c00;
        border: none;
        color: white;
        padding: 0.5rem 2rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        text-transform: uppercase;
        &:hover {
          background-color: #ffa000;
        }
      }
    }
  }
`;
