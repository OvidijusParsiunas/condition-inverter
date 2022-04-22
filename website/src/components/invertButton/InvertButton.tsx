import { IfInverter } from 'inverter/src/ifInverter';
import './invertButton.css';

interface Props {
  input: string;
  inversionCallback: (result: string) => void;
}

export default function InvertButton(props: Props) {
  const { input, inversionCallback } = props;
  const invert = () => {
    const inversionResult = IfInverter.invert(input);
    inversionCallback(inversionResult);
  };

  return (
    <button type="button" id="invert-button" className="screen-center-position" onClick={invert}>
      Invert
    </button>
  );
}
