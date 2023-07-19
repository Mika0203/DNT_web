import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {DomainAPI} from '@src/api';
import {useListContext} from '@src/features/ui/listview';
import {useDomainContext} from '../domain-list.context';

export default function DeleteSelectedItemsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {selectedList, unSelectAll} = useListContext();
  const {init} = useDomainContext();

  const onClickToDelete = async () => {
    const filters = [];

    for (let i of selectedList) {
      const res = await DomainAPI.deleteDomain(i);
      if (res.success) filters.push(i);
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
          {selectedList.length}개의 도메인을 삭제할까요?
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
