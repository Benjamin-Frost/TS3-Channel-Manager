import React, { useState } from 'react';
import ChannelForm, { IFormInput } from '../components/form';
import { useHistory } from 'react-router-dom';
import ChannelService from '../services/channel';
import { axiosErrorToString } from '../../utils/axios-errors';

// Bootstrap Imports
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

const CreateChannelPage: React.FC = () => {
  const [error, setError] = useState('');
  const history = useHistory();

  const onSubmit = async (data: IFormInput) => {
    try {
      await ChannelService.create(data.channelName, data.channelPassword);
      history.push('/channels');
    } catch (error) {
      setError(axiosErrorToString(error));
    }
  };

  return (
    <React.Fragment>
      <Container>
        <h2 className="mb-4">New Channel</h2>
        <ChannelForm onSubmit={onSubmit} />
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Container>
    </React.Fragment>
  );
};

export default CreateChannelPage;
