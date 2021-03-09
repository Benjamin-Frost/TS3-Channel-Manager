import React from 'react';
import ChannelForm, { IFormInput } from '../components/form';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';

const EditChannelPage: React.FC = () => {
  const onSubmit = (data: IFormInput) => {
    console.log('Hello from edit');
    console.log(data);
  };
  return (
    <React.Fragment>
      <Container>
        <h2 className="mb-4">Edit Channel</h2>
        <ChannelForm
          onSubmit={onSubmit}
          defaultValues={{ channelName: 'test1' }}
        />
      </Container>
    </React.Fragment>
  );
};

export default EditChannelPage;
