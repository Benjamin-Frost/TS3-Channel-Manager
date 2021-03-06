import React from 'react';
import { StepWizardChildProps } from 'react-step-wizard';

// Bootstrap Imports
import Form from 'react-bootstrap/Form';

// Component Imports
import Stats from './stats';

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

export default Step2;
