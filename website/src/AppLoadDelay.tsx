import { ComponentsAsProp } from './shared/types/componentsAsProp';
import React from 'react';

type Props = {
  children: ComponentsAsProp;
  errorHandlerCallback: (message: string) => void;
};

export default function AppLoadDelay(props: Props) {
  const { children, errorHandlerCallback } = props;

  const [isAppDisplayed, setIsAppDisplayed] = React.useState(false);

  const handleFontStyleError = () => {
    errorHandlerCallback('Failed to load font stylesheet');
    setIsAppDisplayed(true);
  };

  const loadFontStyle = () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    link.onerror = () => handleFontStyleError();
    link.onload = () => setIsAppDisplayed(true);
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  React.useEffect(() => {
    loadFontStyle();
  }, []);

  return <div style={{ display: isAppDisplayed ? 'block' : 'none' }}>{children}</div>;
}
