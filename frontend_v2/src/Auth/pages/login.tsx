import React from 'react';
import StepWizard, { StepWizardChildProps } from 'react-step-wizard';

// Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const LoginPage: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <StepWizard>
          <Step1 />
          <Step2 />
        </StepWizard>
      </Container>
    </React.Fragment>
  );
};

interface StatsProps {
  nextStep: () => void;
  totalSteps: number;
  currentStep: number;
}

const Stats: React.FC<StatsProps> = (props: StatsProps) => (
  <div>
    <hr />
    {props.currentStep < props.totalSteps ? (
      <Button block onClick={props.nextStep}>
        Continue
      </Button>
    ) : (
      <Button variant="success" block onClick={props.nextStep}>
        Login
      </Button>
    )}
  </div>
);

const Step1 = (props: Partial<StepWizardChildProps>) => {
  const test = () => {
    props.nextStep!();
  };
  return (
    <React.Fragment>
      <h2 className="text-center mb-3">Welcome 🤗</h2>
      <Form.Group>
        <Form.Label>TS3 UID*</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <p>
        <em>
          <small>
            *You can find your Unique ID (UID) in Tools → Identities → Go
            Advanced
          </small>
        </em>
      </p>
      <Stats
        nextStep={test}
        totalSteps={props.totalSteps!}
        currentStep={props.currentStep!}
      />
    </React.Fragment>
  );
};

const Step2 = (props: Partial<StepWizardChildProps>) => {
  const test = () => {
    props.nextStep!();
  };
  return (
    <React.Fragment>
      <h2 className="text-center">Almost there 😇</h2>
      <Form.Group>
        <Form.Label>Auth Key*</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <p>
        <em>
          <small>
            *You should have received the auth key as a direct message just now
          </small>
        </em>
      </p>
      <Stats
        nextStep={test}
        totalSteps={props.totalSteps!}
        currentStep={props.currentStep!}
      />
    </React.Fragment>
  );
};

export default LoginPage;
