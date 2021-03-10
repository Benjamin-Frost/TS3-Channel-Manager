import Button from 'react-bootstrap/Button';

interface Props {
  nextStep: () => void;
  totalSteps: number;
  currentStep: number;
}

const Stats: React.FC<Props> = (props: Props) => (
  <div>
    <hr />
    {props.currentStep < props.totalSteps ? (
      <Button block onClick={props.nextStep}>
        Continue
      </Button>
    ) : (
      <Button variant="success" block onClick={props.nextStep}>
        Login
      </Button>
    )}
  </div>
);

export default Stats;
