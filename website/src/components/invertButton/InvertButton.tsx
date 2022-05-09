import { IfInverter } from 'shared/inverter/src/ifInverter';
import './invertButton.css';

interface Props {
  input: string;
  inversionCallback: (result: string) => void;
  errorHandlerCallback: (message: string) => void;
}

export default function InvertButton(props: Props) {
  const { input, inversionCallback, errorHandlerCallback } = props;

  const invert = () => {
    try {
      const inversionResult = IfInverter.invert(input);
      inversionCallback(inversionResult);
    } catch (error) {
      errorHandlerCallback((error as Error).message);
    }
  };

  return (
    <button type="button" id="invert-button" className="screen-center-position" onClick={invert}>
      Invert
    </button>
  );
}
