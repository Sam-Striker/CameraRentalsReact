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

const AdminDashboard = () => {    

  return (
    <div>
      <Navbar color="light" light expand="lg">
        <Container>
          <NavbarBrand href="#">Admin Dashboard</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/ListCameras">Log Out</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1>Welcome, Admin</h1>
        <p>This is your dashboard. You can Manage cameras and manage your App here.</p>
        <Button color="primary" href="/">
          Add Camera
        </Button>
      </Container>
    </div>
  );
};

export default AdminDashboard;
