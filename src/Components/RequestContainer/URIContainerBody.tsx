import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { HttpMethod } from '../../state/types';
import { requestActions, useSelectRequest } from '../../state/new/RequestReducer';

export function URIContainerBody() {
  const { method, url } = useSelectRequest();
  const dispatch = useDispatch();

  const handleMethodChange = (newMethod: HttpMethod) => {
    dispatch(requestActions.setMethod(newMethod));
  };

  const handleUrlChange = (newUrl: string) => {
    dispatch(requestActions.setUrl(newUrl));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        alignSelf: 'stretch',
        mt: 2,
      }}
    >
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Method</InputLabel>
        <Select
          label='HTTP Method'
          value={method}
          onChange={(e) => {
            handleMethodChange(e.target.value as HttpMethod);
          }}
          labelId='http-method-select-label'
          id='http-method-select'
          sx={{
            width: '100px',
          }}
        >
          {Object.values(HttpMethod).map((method, index) => (
            <MenuItem key={index} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label='URL'
        value={url}
        onChange={(e) => {
          handleUrlChange(e.target.value);
        }}
        fullWidth
        InputProps={{
          sx: { height: '100%' },
        }}
      />
    </Box>
  );
}
