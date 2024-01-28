import { Box, Tab, Tabs, Typography } from '@mui/material';
import { KeyValueTable } from '../KeyValueTable';
import { useDispatch } from 'react-redux';

import { type Header, requestActions, useSelectRequest } from '../../state/new/RequestReducer';
import { useState } from 'react';
import { CreateHeaderModal } from './CreateHeaderModal';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function RequestHeadersContainer() {
  const dispatch = useDispatch();
  const { headers } = useSelectRequest();

  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleHeaderChange = (id: string, header: Partial<Header>) => {
    dispatch(requestActions.updateHeader({ id, header }));
  };

  return (
    <Box>
      <Typography variant='h4'>Headers</Typography>
      <Tabs value={value} onChange={handleChange}>
        <Tab className='tab' label='Headers' {...a11yProps(0)} />
        <Tab className='tab' label='Authentication' {...a11yProps(1)} />
        <Tab className='tab' label='Raw' {...a11yProps(2)} />
      </Tabs>
      {value === 0 && (
        <>
          <KeyValueTable rows={headers} onChange={handleHeaderChange} />
          <CreateHeaderModal />
        </>
      )}
    </Box>
  );
}
