import React, { useState } from 'react';
import { StepWizardChildProps } from 'react-step-wizard';
import AuthService from '../services/auth';
import { useHistory } from 'react-router-dom';
import { axiosErrorToString } from '../../utils/axios-errors';

// Bootstrap Imports
import Form from 'react-bootstrap/Form';

// Component Imports
import Stats from './stats';
interface Props {
  showError: (message: string) => void;
  ts3Uid: string;
}

const Step2: React.FC<Partial<StepWizardChildProps> & Props> = (
  props: Partial<StepWizardChildProps> & Props
) => {
  const [key, setKey] = useState('');
  const history = useHistory();

  const login = async () => {
    try {
      await AuthService.login(props.ts3Uid, key);
      props.showError(''); // Clear errors
      history.push('/channels');
      window.location.reload();
    } catch (error) {
      props.showError(axiosErrorToString(error));
    }
  };
  return (
    <React.Fragment>
      <h2 className="text-center">Almost there 😇</h2>
      <Form.Group>
        <Form.Label>Auth Key*</Form.Label>
        <Form.Control
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </Form.Group>
      <p>
        <em>
          <small>
            *You should have received the auth key as a direct message just now
          </small>
        </em>
      </p>
      <Stats
        nextStep={login}
        totalSteps={props.totalSteps!}
        currentStep={props.currentStep!}
      />
    </React.Fragment>
  );
};

export default Step2;
