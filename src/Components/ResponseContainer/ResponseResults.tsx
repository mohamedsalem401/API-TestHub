import { useState } from 'react';
import { useSelectResponse } from '../../state/new/ResponseReducer';
import { Tab, Tabs } from '@mui/material';
import { ResponseBody } from './ResponseBody';
import { a11yProps } from '../../helpers/a11yProps';

export const ResponseResults = () => {
  const [value, setValue] = useState<number>(0);

  const {
    res: { body, headers },
  } = useSelectResponse();

  const displayedValue = value === 0 ? body : headers;

  return (
    <>
      <Tabs
        value={value}
        sx={{
          display: 'flex',
          height: '42px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
        }}
        onChange={(_e, newValue) => setValue(newValue)}
      >
        <Tab className='tab' label='Body' {...a11yProps(0)} />
        <Tab className='tab' label='Headers' {...a11yProps(1)} />
      </Tabs>

      <ResponseBody value={displayedValue} />
    </>
  );
};
