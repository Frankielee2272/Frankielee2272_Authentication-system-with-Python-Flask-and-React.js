import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Private = () =>  {
  const { store, actions} = useContext(Context)
  const token = sessionStorage.getItem('token')
  const user = sessionStorage.getItem('user')
  const navigate = useNavigate()
  const logout = () => {

    actions.logout()
    navigate('/login')
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{user ? `Hello ${user}` : 'Please go login'}</Card.Title>
        <Card.Text>
          {token ? `You are logged in here is your token: ${token}` : "You do not have permision"}
        </Card.Text>
        <Button variant="primary" onClick={()=> logout()}>Log out</Button>
      </Card.Body>
    </Card>
  );
}

