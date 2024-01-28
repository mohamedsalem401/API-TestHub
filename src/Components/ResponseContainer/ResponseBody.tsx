import { Box } from '@mui/material';
import { Editor } from '@monaco-editor/react';

export function ResponseBody({ value }: { value: any }) {
  return (
    <Box>
      <Editor
        width='100%'
        height='300px'
        value={JSON.stringify(value, null, 2)}
        theme='vs-dark'
        options={{ readOnly: true }}
        defaultLanguage='json'
      />
    </Box>
  );
}
