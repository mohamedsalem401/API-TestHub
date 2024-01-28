import { Box } from '@mui/material';
import { RequestContainer } from './Components/RequestContainer';
// import { ResponseContainer } from './Components/ResponseContainer';

const ApiEndpoint = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '80px',
      }}
    >
      <RequestContainer />
      {/* <ResponseContainer /> */}
    </Box>
  );
};

export default ApiEndpoint;
