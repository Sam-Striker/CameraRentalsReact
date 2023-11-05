import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
} from 'reactstrap';

const CustomerDashboard = () => {    

  return (
    <div>
      <Navbar color="light" light expand="lg">
        <Container>
          <NavbarBrand href="#">Customer Dashboard</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Log Out</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1>Welcome, Customer</h1>
        <p>This is your dashboard. You can rent cameras and manage your rentals here.</p>
        <Button color="primary" href="/ClientCameras">
          Rent Camera
        </Button>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
