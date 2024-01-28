import { Alert, Box, IconButton } from '@mui/material';
import { ContentCopy, Download, OpenInFull } from '@mui/icons-material';
import { useSelectResponse } from '../../state/ResponseReducer';

export function ResponseActions() {
  const { res } = useSelectResponse();
  const { body, code, time } = res;

  const stringifiedBody = JSON.stringify(body);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Alert severity={code >= 400 ? 'error' : 'success'}>{code}</Alert>
      <Alert severity='info'>{time.toFixed(0)} ms</Alert>
      <Alert severity='info'>{((stringifiedBody?.length || 0) / 1024).toFixed(2)} KB</Alert>
      <Box style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        <IconButton
        //TODO
        // onClick={() => {
        //   copyToClipboard(stringfiedBody);
        // }}
        >
          <ContentCopy />
        </IconButton>
        <IconButton>
          <OpenInFull />
        </IconButton>
        <IconButton
        //TODO
        // onClick={() => {
        //   downloadFile(stringfiedBody, '', extension);
        // }}
        >
          <Download />
        </IconButton>
      </Box>
    </Box>
  );
}
