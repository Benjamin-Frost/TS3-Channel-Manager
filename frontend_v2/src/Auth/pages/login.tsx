import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';

// Bootstrap Imports
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

// Component Imports
import Step1 from '../components/step1';
import Step2 from '../components/step2';

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  return (
    <React.Fragment>
      <Container>
        <Jumbotron>
          <StepWizard>
            <Step1 showError={setError} />
            <Step2 />
          </StepWizard>
          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </Jumbotron>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
