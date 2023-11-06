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

const ListCameras = () => {
  const user = {id: localStorage.getItem("User").split(" ")[0], username: localStorage.getItem("User").split(" ")[1]};
  const [cameras, setCameras] = useState([]);
  const [formData, setFormData] = useState({
    existingId: '',
    serialNbr: '',
    model: '',
    rent_status: 'available',
    lense: '',
    status: 1,
    date: '',
    user: user,
  });
  const [formAction, setFormAction] = useState('Submit');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState(''); 

  useEffect(() => {
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

    fetchCameras();
  }, []);
  

  const handleFormChangeAction = (cameraId, action) => {
    if (action === 'UPDATE' || action === 'DELETE') {
      const camera = cameras.find((c) => c.id === cameraId);

      if (camera) {
        if (action === 'UPDATE') {
          // Handle the update action
          setFormData({
            existingId: camera.id,
            serialNbr: camera.serialNbr,
            model: camera.model,
            lense: camera.lense,
            date: camera.date,
            status: camera.status,  
            rentStatus: camera.rentStatus,
          });
          setFormAction('Update');
        } else if (action === 'DELETE') {
          // Handle the delete action
          setFormData({
            existingId: cameraId, 
            serialNbr: camera.serialNbr,
            model: camera.model,
            lense: camera.lense,
            date: camera.date,
          });
          setFormAction('Delete');
        }
      } else {
        console.error('Camera not found for the given ID');
      }
    }
  };

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formAction === 'Submit') {
      // Handle camera creation (submitting a new camera)
      try {
        console.log(formData);
        const response = await fetch('http://localhost:8080/24239/cam/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serialNbr: formData.serialNbr,
            model: formData.model,
            rentStatus: formData.rent_status,
            lense: formData.lense,
            date: formData.date,
            status: formData.status,
            user: formData.user,            
          }),
        });

        if (response.ok) {
          setInfoMessage('Camera created successfully');           
             
        } else {
          setErrorMessage('Failed to create the camera');
        }
      } catch (error) {
        console.error('Error creating the camera:', error);
        setErrorMessage('An error occurred while creating the camera');
      }
    } else if (formAction === 'Update') {
      // Handle camera update (submitting an update)
      try {
        const response = await fetch('http://localhost:8080/24239/cam/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: formData.existingId,
            serialNbr: formData.serialNbr,
            model: formData.model,            
            lense: formData.lense,
            date: formData.date,    
            status: formData.status,  
            rentStatus: formData.rentStatus,        
          }),
        });

        if (response.ok) {
          setInfoMessage('Camera updated successfully');
          // You may also fetch the updated camera list from the server
        } else {
          setErrorMessage('Failed to update the camera');
        }
      } catch (error) {
        console.error('Error updating the camera:', error);
        setErrorMessage('An error occurred while updating the camera');
      }
    } else if (formAction === 'Delete') {      
      try {
        const response = await fetch(`http://localhost:8080/24239/cam/updateCamStatus`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: formData.existingId,
            status: 0,
          }),
        });

        if (response.ok) {
          setInfoMessage('Camera deleted successfully');
          // You may also fetch the updated camera list from the server
        } else {
          setErrorMessage('Failed to delete the camera');
        }
      } catch (error) {
        console.error('Error deleting the camera:', error);
        setErrorMessage('An error occurred while deleting the camera');
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

  console.log(cameras);

  return (
    <div>
      <Navbar color="light" light expand="lg">
        <Container>
          <NavbarBrand href="#">Camera Rental System</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Log Out</NavLink>
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
                  <td>{camera.user.username}</td>
                  <td>{camera.serialNbr}</td>
                  <td>{camera.model}</td>
                  <td>{camera.lense}</td>
                  <td>{camera.rentStatus}</td>
                  <td>{camera.date}</td>
                  <td>
                    <div className="tdAction">
                      <Button
                        className="updateBtn"
                        onClick={() => handleFormChangeAction(camera.id, 'UPDATE')}
                      >
                        UPDATE
                      </Button>
                      <br />
                      <Button
                        className="deleteBtn"
                        onClick={() => handleFormChangeAction(camera.id, 'DELETE')}
                      >
                        DELETE
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>

        <div className="actions">
          <Form onSubmit={handleFormSubmit} id="form">
            <h3>Add/Update Cameras</h3>
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
                onChange={(e) => handleFormChange("serialNbr", e.target.value)}
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
                onChange={(e) => handleFormChange("model", e.target.value)}
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
                onChange={(e) => handleFormChange("lense", e.target.value)}
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
                onChange={(e) => handleFormChange("date", e.target.value)}
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

export default ListCameras;
