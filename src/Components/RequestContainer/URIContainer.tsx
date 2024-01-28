import { Box } from '@mui/material';
import { URIContainerHeader } from './URIContainerHeader';
import { URIContainerBody } from './URIContainerBody';

export function URIContainer() {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 'var(--1, 8px)',
        alignSelf: 'stretch',
      }}
    >
      <URIContainerHeader />
      <URIContainerBody />
    </Box>
  );
}
