import { useForm } from 'react-hook-form';

// Bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export interface IFormInput {
  channelName: string;
  channelPassword: string;
}

interface Props {
  onSubmit: (data: IFormInput) => void;
  defaultValues?: Partial<IFormInput>;
}

export default function ChannelForm(props: Props) {
  const { register, errors, handleSubmit } = useForm<IFormInput>({
    defaultValues: props.defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <Form.Group>
        <Form.Label>Channel Name</Form.Label>
        <Form.Control
          name="channelName"
          ref={register({ required: true, minLength: 5, maxLength: 20 })}
          isInvalid={!!errors.channelName}
          autoComplete="off"
        />
        {errors.channelName && (
          <Form.Control.Feedback type="invalid">
            Channel Name is required and its length needs to be between 5 and 20
            characters.
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Channel Password</Form.Label>
        <Form.Control
          name="channelPassword"
          type="password"
          ref={register({ required: true })}
          isInvalid={!!errors.channelPassword}
          autoComplete="off"
        />
        {errors.channelPassword && (
          <Form.Control.Feedback type="invalid">
            Channel Password is required
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
