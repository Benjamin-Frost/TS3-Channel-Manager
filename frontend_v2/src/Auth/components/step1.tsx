import React from 'react';
import { StepWizardChildProps } from 'react-step-wizard';

// Bootstrap Imports
import Form from 'react-bootstrap/Form';

// Component Imports
import Stats from './stats';

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

export default Step1;
