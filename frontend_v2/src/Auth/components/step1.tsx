import React, { useState } from 'react';
import { StepWizardChildProps } from 'react-step-wizard';
import AuthService from '../services/auth';

// Bootstrap Imports
import Form from 'react-bootstrap/Form';

// Component Imports
import Stats from './stats';

interface Props {
  showError: (message: string) => void;
}

const Step1: React.FC<Partial<StepWizardChildProps> & Props> = (
  props: Partial<StepWizardChildProps> & Props
) => {
  const [ts3Uid, setTs3Uid] = useState('');

  const requestAuthKey = async () => {
    try {
      await AuthService.requestAuthKey(ts3Uid);
      props.showError(''); // Clear errors
      props.nextStep!();
    } catch (error) {
      props.showError(error.message);
    }
  };
  return (
    <React.Fragment>
      <h2 className="text-center mb-3">Welcome 🤗</h2>
      <Form.Group>
        <Form.Label>TS3 UID*</Form.Label>
        <Form.Control
          type="text"
          value={ts3Uid}
          onChange={(e) => setTs3Uid(e.target.value)}
        />
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
        nextStep={requestAuthKey}
        totalSteps={props.totalSteps!}
        currentStep={props.currentStep!}
      />
    </React.Fragment>
  );
};

export default Step1;
