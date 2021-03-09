import React, { useEffect, useState } from 'react';
import ChannelForm, { IFormInput } from '../components/form';
import { useParams, useHistory } from 'react-router-dom';
import ChannelService from '../services/channel';
import { axiosErrorToString } from '../../utils/axios-errors';

// Bootstrap Imports
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

interface Params {
  id: string;
}

const EditChannelPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();
  const [error, setError] = useState('');
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const channel = await ChannelService.getById(id);
        setChannelName(channel.channelName);
      } catch (error) {
        setError(axiosErrorToString(error));
      }
    };
    fetchChannel();
  }, [id]);

  const onSubmit = async (data: IFormInput) => {
    try {
      await ChannelService.edit(id, data.channelName, data.channelPassword);
      history.push('/channels');
    } catch (error) {
      setError(axiosErrorToString(error));
    }
  };
  return (
    <React.Fragment>
      <Container>
        <h2 className="mb-4">Edit Channel</h2>
        {channelName ? (
          <ChannelForm
            onSubmit={onSubmit}
            defaultValues={{ channelName: channelName }}
          />
        ) : (
          <Spinner animation="border" />
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Container>
    </React.Fragment>
  );
};

export default EditChannelPage;
