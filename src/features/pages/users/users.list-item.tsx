import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import {useState} from 'react';

import {useAuthContext} from './users.context';
import {UserModel} from '@src/models';
import {useListContext} from '@src/features/ui/listview';

export default function AuthKeyListItem({data}: {data: UserModel}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const {deleteUser} = useAuthContext();
  const {onCheckItem, isSelected} = useListContext();
  const onClickToDelete = async () => {
    deleteUser(data.seq);
    setDeleteOpen(false);
  };

  return (
    <TableRow>
      <TableCell padding={'checkbox'}>
        <Checkbox
          color='primary'
          checked={isSelected(data)}
          onChange={(e) => onCheckItem(data)}
          inputProps={{
            'aria-label': 'select all desserts',
          }}
        />
      </TableCell>
      <TableCell align={'center'}>{data.name}</TableCell>
      <TableCell align={'center'}>{data.email}</TableCell>
      <TableCell align={'center'}>{data.securityKey}</TableCell>
      <TableCell align={'center'}>{data.clientId} </TableCell>
      <TableCell padding={'checkbox'}>
        <Button
          id='basic-button'
          // aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          // aria-expanded={open ? 'true' : undefined}
          onClick={() => setDeleteOpen(true)}
        >
          <Delete />
          {/* <GridMenuIcon /> */}
        </Button>
      </TableCell>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle id='alert-dialog-title'>{'경고'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            해당 유저를 삭제할까요?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} autoFocus>
            취소
          </Button>
          <Button onClick={onClickToDelete}>확인</Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
