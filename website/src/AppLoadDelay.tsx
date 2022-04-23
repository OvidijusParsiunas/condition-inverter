import { ComponentsAsProp } from './shared/types/componentsAsProp';
import React from 'react';

type Props = {
  children: ComponentsAsProp;
};

export default function AppLoadDelay(props: Props) {
  const [displayed, setDisplayed] = React.useState(false);

  const { children } = props;

  const onFontStyleLoaded = () => {
    setDisplayed(true);
  };

  const handleFonstStyleError = () => {
    // ErrorHandler.displayMessageOnConsole('Failed to load font stylesheet');
    onFontStyleLoaded();
  };

  const loadFontStyle = () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    link.onerror = () => handleFonstStyleError();
    link.onload = () => onFontStyleLoaded();
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  React.useEffect(() => {
    loadFontStyle();
  }, []);

  return <div style={{ display: displayed ? 'block' : 'none' }}>{children}</div>;
}
