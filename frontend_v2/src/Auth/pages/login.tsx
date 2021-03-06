import React from 'react';
import StepWizard from 'react-step-wizard';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

// Component Imports
import Step1 from '../components/step1';
import Step2 from '../components/step2';

const LoginPage: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <Jumbotron>
          <StepWizard>
            <Step1 />
            <Step2 />
          </StepWizard>
        </Jumbotron>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
