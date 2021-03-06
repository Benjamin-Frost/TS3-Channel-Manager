import React from 'react';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

const LoginPage: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <Jumbotron className="text-center">
          <h1 className="display-4">Login Page</h1>
        </Jumbotron>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
