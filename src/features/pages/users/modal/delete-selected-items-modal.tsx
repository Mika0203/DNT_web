import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {UserAPI} from '@src/api';
import {useListContext} from '@src/features/ui/listview';
import {useAuthContext} from '../users.context';

export default function DeleteSelectedItemsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {selectedList, unSelectAll} = useListContext();
  const {init} = useAuthContext();

  const onClickToDelete = async () => {
    for (let i of selectedList) {
      await UserAPI.deleteUser(i);
    }
    unSelectAll();
    onClose();
    init();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id='alert-dialog-title'>{'경고'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {selectedList.length}명의 유저를 삭제할까요?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          취소
        </Button>
        <Button onClick={onClickToDelete}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
