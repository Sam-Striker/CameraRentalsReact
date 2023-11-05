import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Container,
    Row,
    Col,
} from 'reactstrap';

const LoginSignup = () => {
    const [nationalID, setNationalID] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone_nbr, setphone_nbr] = useState('');
    const [date, setDate] = useState('');
    const [role, setRole] = useState('seller'); // Default role
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isLoginPage, setIsLoginPage] = useState(true); // Track whether it's a login or signup page
    const navigate = useNavigate(); 
    // const [isAuthenticated, setIsAuthenticated] = useState(false); 

    const handleSignup = () => {
        const data = {
            nationalID: nationalID,
            username: username,
            password: password,
            address: address,
            phone_nbr: phone_nbr,
            date: date,
            role: role,
        };

        fetch('http://localhost:8080/24239/user/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {                
                if (data.status===true) {                    
                    setInfoMessage(data.message);  
                     // Reset form fields
                    setNationalID('');
                    setUsername('');
                    setPassword('');
                    setAddress('');
                    setphone_nbr('');
                    setDate('');
                    setRole('seller');                                                                                                                                        
                }else if (data.status===false){
                    setErrorMessage(data.message); 
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setErrorMessage('An error occurred.');
            });
            setInfoMessage('');
            setErrorMessage('');        

       
    };   

    const handleLogin = () => {
        const data = {
            nationalID: nationalID,
            password: password,
        };

        fetch('http://localhost:8080/24239/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {                                                              
                if (data.status===true) {                    
                    setInfoMessage(data.message);                        
                    // setIsAuthenticated(true);      
                    // console.log(isAuthenticated);                                                                                                                                   
                    // navigate('/CustomerDashboard'); 
                    
                    if (data.role === 'client') {
                        navigate('/CustomerDashboard');
                      } else if (data.role === 'seller') {
                        navigate('/AdminDashboard'); // Assuming you have an AdminDashboard route
                      }

                    setNationalID('');
                    setPassword('');
                }else if (data.status===false){
                    setErrorMessage(data.message); 
                }
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setErrorMessage('An error occurred.');
            });
 
        // Reset form fields       
        setInfoMessage(''); 
        setErrorMessage('');
    };

    const switchToSignup = () => {
        setInfoMessage(''); 
        setErrorMessage('');
        setIsLoginPage(false);       
    };

    const switchToLogin = () => {
        setInfoMessage(''); 
        setErrorMessage('');
        setIsLoginPage(true);       
    };

    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
             {/* {isAuthenticated ? (
                       navigate('/CustomerDashboard')    
            ) : ( */}
                <Container>
                <Row>
                    <Col md={6}>
                        {isLoginPage ? (
                            <div>
                                <span>
                                    {infoMessage||errorMessage}
                                </span>
                                <h1>Login</h1>
                                <Form>
                                    {/* Login form elements */}
                                    <FormGroup>
                                        <Label for="nationalID">NationalID</Label>
                                        <Input
                                            type="text"
                                            id="nationalID"
                                            value={nationalID}
                                            onChange={(e) => setNationalID(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                        />
                                    </FormGroup>
                                    <Button onClick={handleLogin}>Login</Button>
                                </Form>
                                <p>
                                    Don't have an account?{' '}
                                    <Button onClick={switchToSignup}>Sign Up</Button>
                                </p>
                            </div>
                        ) : (
                            <div>
                                 <span>
                                    {infoMessage||errorMessage}
                                </span>
                                <h1>Signup</h1>
                                <Form>
                                    {/* Signup form elements */}
                                    <FormGroup>
                                        <Label for="nationalID">NationalID</Label>
                                        <Input
                                            type="text"
                                            id="nationalID"
                                            value={nationalID}
                                            onChange={(e) => setNationalID(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}                                            
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone_nbr">Phone Number</Label>
                                        <Input
                                            type="text"
                                            id="phone_nbr"
                                            value={phone_nbr}
                                            onChange={(e) => setphone_nbr(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="date">Date</Label>
                                        <Input
                                            type="date"
                                            id="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="role">Role</Label>
                                        <Input
                                            type="select"
                                            id="role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="client">Client</option>
                                            <option value="seller">Seller</option>
                                        </Input>
                                    </FormGroup>
                                    <Button onClick={handleSignup}>Signup</Button>
                                </Form>
                                <p>
                                    Already have an account?{' '}
                                    <Button onClick={switchToLogin}>Login</Button>
                                </p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            {/* )}             */}
        </div>
    );
};

export default LoginSignup;
