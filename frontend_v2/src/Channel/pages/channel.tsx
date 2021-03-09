import React, { useState, useEffect } from 'react';
import { IChannel } from '../interfaces/channel';
import ChannelService from '../services/channel';
import { useHistory, useRouteMatch } from 'react-router-dom';

// Bootstrap imports
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const ChannelPage: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const [error, setError] = useState('');
  const [channels, setChannels] = useState<IChannel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await ChannelService.channelList();
        setChannels(response);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchChannels();
  }, []);

  const forwardToChannelDetails = (id: string) => {
    history.push(`${match.path}/${id}`);
  };

  return (
    <React.Fragment>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2>Your Channels</h2>
          </Col>
          <Col>
            <Button
              variant="success"
              className="float-right"
              href="/channels/create"
            >
              New Channel
            </Button>
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((channel) => {
              return (
                <tr
                  onClick={(e) => forwardToChannelDetails(channel._id)}
                  key={channel._id}
                  role="button"
                >
                  <td>{channel.channelNum}</td>
                  <td>{channel.channelName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
};

export default ChannelPage;
