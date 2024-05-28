import React, { useContext } from "react";
import Card from 'react-bootstrap/Card';
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem('token')
  console.log("Session storage get item from home", token)

	return (
			<Card style={{ margin: '0 auto', width: '18rem' }}>
				<Card.Body>
					<Card.Title>Home</Card.Title>
					<Card.Text>
            { token ? `${token}` : 'No token please login'}
					</Card.Text>
          {store.token ? (
            <button onClick={() => actions.logout()}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
				</Card.Body>
			</Card>
  );
}

