import { Box, Button, Tab, Tabs } from '@mui/material';
import { PlayCircle } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { sendHttpReq, useSelectResponse } from '../../state/new/ResponseReducer';
import { useSelectRequest } from '../../state/new/RequestReducer';

export function URIContainerHeader() {
  const reqState = useSelectRequest();
  const { isPending } = useSelectResponse();
  const dispatch = useDispatch<any>();

  const handleSendRequest = () => {
    dispatch(sendHttpReq(reqState));
  };

  return (
    <Box
      style={{
        display: 'flex',
        padding: 'var(--none, 0px)',
        alignItems: 'center',
        gap: 'var(--1, 8px)',
        alignSelf: 'stretch',
      }}
    >
      <Tabs value={'FULL URL'} scrollButtons='auto' style={{ alignSelf: 'stretch' }}>
        <Tab className='tab' label='Full url' value='FULL URL' />
        <Tab className='tab' label='Localhost' value='LOCALHOST' />
        <Tab className='tab' label='Relative path' value='RELATIVE PATH' />
        <Tab className='tab' label='API library' value='API LIBRARY' />
      </Tabs>

      <Button
        variant='contained'
        color='primary'
        className='tab'
        endIcon={<PlayCircle />}
        onClick={handleSendRequest}
        disabled={isPending}
      >
        {isPending ? 'Sending...' : 'RUN'}
      </Button>
    </Box>
  );
}
