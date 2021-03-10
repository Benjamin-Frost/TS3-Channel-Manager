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
  const [ts3Uid, setTs3Uid] = useState('');

  return (
    <React.Fragment>
      <Container>
        <Jumbotron>
          <StepWizard>
            <Step1 showError={setError} ts3Uid={ts3Uid} setTs3Uid={setTs3Uid} />
            <Step2 showError={setError} ts3Uid={ts3Uid} />
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
