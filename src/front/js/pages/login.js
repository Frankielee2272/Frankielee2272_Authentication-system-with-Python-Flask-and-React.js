import React, { useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            actions.login(email,password)
           navigate('/private')
        } catch (error) {
            console.error('Login error:', error.response);
        }
    };

    useEffect(() => {
      console.log("Session Storage", store.token)

    }, [])


    return (
        <Form className="form">
          Login
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    Submit
                </Button>
                <Link to="/signup">No account? Signup</Link>
        </Form>
    );
}

