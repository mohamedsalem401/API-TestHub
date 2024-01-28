import ApiEndpoint from './ApiTester';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './state/new';

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ p: '32px' }} component='main'>
        <ApiEndpoint />
      </Box>
    </Provider>
  );
}

export default App;
