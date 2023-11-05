import React, { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const ClientCameras = () => {
  const [cameras, setCameras] = useState([]);
  const [formData, setFormData] = useState({
    existingId: '',
    serialNbr: '',
    model: '',
    lense: '',
    date: '',
    rentStatus: '',
  });
  const [formAction, setFormAction] = useState('Submit');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  // Function to fetch camera data
  const fetchCameras = async () => {
    try {
      const response = await fetch('http://localhost:8080/24239/cam/listall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCameras(data);
      } else {
        console.error('Failed to fetch camera data');
      }
    } catch (error) {
      console.error('Error fetching camera data:', error);
    }
  };

  useEffect(() => {
    fetchCameras(); // Fetch camera data on component mount
  }, []);

  const handleRentCamera = (cameraId) => {
    const camera = cameras.find((c) => c.id === cameraId);

    if (camera) {
      setFormData({
        existingId: camera.id,
        serialNbr: camera.serialNbr,
        model: camera.model,
        lense: camera.lense,
        date: camera.date,
        rentStatus: camera.rentStatus,
      });
      setFormAction('Rent');
    } else {
      console.error('Camera not found for the given ID');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formAction === 'Rent') {
      // Handle camera rental (submitting a rental request)
      try {
        const response = await fetch('http://localhost:8080/24239/cam/updateCamRentStatus', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: formData.existingId,            
            rentStatus: 'rented',
          }),
        });

        if (response.ok) {
          setInfoMessage('Camera Rented successfully');
          // You may also fetch the updated camera list from the server
        } else {
          setErrorMessage('Failed to Rent the camera');
        }
      } catch (error) {
        console.error('Error renting the camera:', error);
        setErrorMessage('An error occurred while renting the camera');
      }
    }
      // Reset the form
      setFormData({
        existingId: '',
        serialNbr: '',
        model: '',
        lense: '',
        date: '',
      });
      setFormAction('Submit');
  };

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <Navbar color="light" light expand="lg">
        <Container>
          <NavbarBrand href="#">Camera Rental System</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="../components/login.jsp">Log Out</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h2>Camera Information</h2>
        <Table bordered>
          <thead>
            <tr>
              <th>id</th>
              <th>user</th>
              <th>Serial Number</th>
              <th>Model</th>
              <th>Lens</th>
              <th>Rent Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera) =>
              camera.status === 1 ? (
                <tr key={camera.id}>
                  <td>{camera.id}</td>
                  <td>{camera.user ? camera.user.username : 'N/A'}</td>
                  <td>{camera.serialNbr}</td>
                  <td>{camera.model}</td>
                  <td>{camera.lense}</td>
                  <td>{camera.rentStatus}</td>
                  <td>{camera.date}</td>
                  <td>
                    <Button
                      className="updateBtn"
                      onClick={() => handleRentCamera(camera.id)}
                    >
                      RENT
                    </Button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>

        <div className="actions">
          <Form onSubmit={handleFormSubmit} id="form">
            <h3>Rent Cameras</h3>
            <small style={{ color: 'darkred' }}>{errorMessage}</small>
            <small style={{ color: 'green' }}>{infoMessage}</small>

            <FormGroup>
              <Input
                type="hidden"
                name="existingId"
                value={formData.existingId}
              />
            </FormGroup>

            <FormGroup>
              <Label for="serialNbr">Serial Number:</Label>
              <Input
                type="text"
                id="serialNbr"
                name="serialNbr"
                value={formData.serialNbr}
                onChange={(e) => handleFormChange('serialNbr', e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="model">Model:</Label>
              <Input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={(e) => handleFormChange('model', e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="lense">Lens:</Label>
              <Input
                type="text"
                id="lense"
                name="lense"
                value={formData.lense}
                onChange={(e) => handleFormChange('lense', e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date:</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={(e) => handleFormChange('date', e.target.value)}
                required
              />
            </FormGroup>

            <Button type="submit" id="formBtn" style={{ backgroundColor: '#2b9b58' }}>
              {formAction}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ClientCameras;
