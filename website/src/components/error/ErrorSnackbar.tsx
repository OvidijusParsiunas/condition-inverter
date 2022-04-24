import { UNEXPECTED_ERROR_MESSAGE_PREFIX, UNEXPECTED_ERROR_MESSAGE_LINK } from 'inverter/consts/errors';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import './errorSnackbar.css';

interface Props {
  display: boolean;
  closeCallback: () => void;
}

export default function ErrorSnackbar(props: Props) {
  const { display, closeCallback } = props;

  // const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
  const handleClose = () => {
    closeCallback();
    // if (reason === 'clickaway') {
    //   return;
    // }
  };

  return (
    <div>
      <Snackbar
        open={display}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={UNEXPECTED_ERROR_MESSAGE_PREFIX}
      >
        <Alert id="error-alert" onClose={handleClose} icon={false}>
          <div id="error-alert-text-prefix">{UNEXPECTED_ERROR_MESSAGE_PREFIX}</div>
          <a id="error-alert-url-text" href={UNEXPECTED_ERROR_MESSAGE_LINK} target="_blank" rel="noreferrer">
            {UNEXPECTED_ERROR_MESSAGE_LINK}
          </a>
        </Alert>
      </Snackbar>
    </div>
  );
}
