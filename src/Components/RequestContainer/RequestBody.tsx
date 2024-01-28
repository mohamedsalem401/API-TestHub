import { Editor } from '@monaco-editor/react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelectRequest, requestActions, type BodyKey } from '../../state/RequestReducer';

export function RequestBody() {
  const { body } = useSelectRequest();
  const dispatch = useDispatch();

  const handleChangeActiveBody = (value: string = '') => {
    dispatch(requestActions.setBody(value));
  };

  const activeBody = Object.keys(body.data).find((k) => body.data[k as BodyKey].id === body.active);

  return (
    <Box>
      {body.active !== 0 && (
        <Editor
          width='100%'
          height='200px'
          theme='vs-dark'
          language={activeBody}
          value={body.data[activeBody as BodyKey].value}
          onChange={handleChangeActiveBody}
        />
      )}
    </Box>
  );
}
