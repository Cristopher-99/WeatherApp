import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store, { persistor } from './redux/store';
import MuiThemeProvider from './theme';
import Router from './routers';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider>
          <Router />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
