import { Tab, Tabs } from '@mui/material';
import { useDispatch } from 'react-redux';
import { a11yProps } from '../../helpers/a11yProps';
import { requestActions, useSelectRequest } from '../../state/RequestReducer';

export function RequestBodyTabs() {
  const { body } = useSelectRequest();
  const dispatch = useDispatch();

  const handleChangeActiveBody = (key: string) => {
    dispatch(requestActions.setActiveBody(key as any));
  };

  return (
    <Tabs
      value={body.active}
      onChange={(e, newValue: string) => {
        handleChangeActiveBody(newValue);
      }}
      variant='scrollable'
      scrollButtons='auto'
    >
      <Tab className='tab' label='none' {...a11yProps('NONE')} />
      {Object.keys(body.data).map((key) => (
        <Tab key={key} className='tab' label={key} {...a11yProps(key)} />
      ))}
    </Tabs>
  );
}
