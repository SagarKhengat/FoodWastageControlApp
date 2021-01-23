
import React from 'react';

import App from './src/App/App'
import { MenuProvider } from 'react-native-popup-menu';

const Application: () => React$Node = () => {
  return (
    <>
      <MenuProvider>

        <App></App>
      </MenuProvider>

    </>
  );
};



export default Application;