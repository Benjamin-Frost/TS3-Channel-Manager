import Button from 'react-bootstrap/Button';

interface StatsProps {
  nextStep: () => void;
  totalSteps: number;
  currentStep: number;
}

const Stats: React.FC<StatsProps> = (props: StatsProps) => (
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
