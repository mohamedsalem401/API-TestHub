import { Add } from '@mui/icons-material';
import { Box, Button, Modal, SxProps, TextField, Theme, Typography } from '@mui/material';
import { useState } from 'react';
import { requestActions } from '../../state/new/RequestReducer';
import { useDispatch } from 'react-redux';

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  height: 'auto',
};

export const CreateHeaderModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant='contained'
        sx={{
          mt: '8px',
        }}
      >
        <Add />
        Add Header
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <CreateHeaderModalForm onDone={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
};

const CreateHeaderModalForm = ({ onDone }: { onDone: () => void }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (key && value) {
      dispatch(requestActions.addHeader({ key, value }));
      onDone();
    }
  };

  return (
    <Box component='form' sx={style} onSubmit={handleSubmit}>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Create New Header
      </Typography>
      <TextField
        id='outlined-basic'
        label='Key'
        variant='outlined'
        size='small'
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <TextField
        id='filled-basic'
        label='Value'
        variant='outlined'
        size='small'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant='contained' type='submit'>
        <Add />
        Add
      </Button>
    </Box>
  );
};
