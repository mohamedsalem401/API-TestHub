import { Box } from '@mui/material';
import { RequestBodyContainer } from './RequestBodyContainer';
import { RequestHeadersContainer } from './RequestHeadersContainer';
import { URIContainer } from './URIContainer';

export function RequestContainer() {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignSelf: 'stretch',
        width: '100%',
      }}
    >
      <URIContainer />
      <RequestHeadersContainer />
      {/* <RequestBodyContainer /> */}
    </Box>
  );
}
