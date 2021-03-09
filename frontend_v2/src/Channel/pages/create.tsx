import React from 'react';
import ChannelForm, { IFormInput } from '../components/form';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';

const CreateChannelPage: React.FC = () => {
  const onSubmit = (data: IFormInput) => {
    console.log('Hello from create');
    console.log(data);
  };
  return (
    <React.Fragment>
      <Container>
        <h2 className="mb-4">New Channel</h2>
        <ChannelForm onSubmit={onSubmit} />
      </Container>
    </React.Fragment>
  );
};

export default CreateChannelPage;
