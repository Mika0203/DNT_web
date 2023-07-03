import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
} from '@mui/material';
import {GridMenuIcon} from '@mui/x-data-grid';
import {styled} from 'styled-components';

import {DomainAPI} from '@src/api';
import {DomainModel} from '@src/models';
import {useDomainContext} from '../domain-list.context';

const StyledMenuItem = styled(MenuItem)`
  padding: 8px 50px !important;
`;

export default function DomainMenu({data}: {data: DomainModel}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteOpen(false);
  };

  const {setData, setEditingItem} = useDomainContext();

  const onClickDelete = async () => {
    setDeleteOpen(true);
  };

  const onClickDeleteReq = async () => {
    const res = await DomainAPI.deleteDomain(data.id);
    if (res.success) {
      setData((e) => e.filter((e2) => e2.id !== data.id));
    }
  };

  const onClickToModify = () => {
    setEditingItem(data);
  };

  return (
    <TableCell padding={'checkbox'}>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <GridMenuIcon />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem onClick={onClickToModify}>수정</StyledMenuItem>
        <StyledMenuItem onClick={onClickDelete}>삭제</StyledMenuItem>
      </Menu>

      <Dialog open={deleteOpen}>
        <DialogTitle id='alert-dialog-title'>{'경고'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            해당 도메인을 삭제할까요?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            취소
          </Button>
          <Button onClick={onClickDeleteReq}>확인</Button>
        </DialogActions>
      </Dialog>
    </TableCell>
  );
}
