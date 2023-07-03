import {useState} from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Addbox from '@mui/icons-material/AddBox';
import Close from '@mui/icons-material/Close';
import {styled} from 'styled-components';

import ExcelImportModal from './ExcelImportModal';
import {useDomainContext} from '../domain-list.context';
import DomainRegisterModal from './DomainRegisterModal';

const StyledTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
`;

export default function DomainAddSelectTypeModal() {
  const [addType, setAddType] = useState<'xlsm' | 'manual' | null>(null);
  const {editingItem, isModalOpened, closeModal} = useDomainContext();
  const onClickType = (type: 'xlsm' | 'manual' | null) => {
    setAddType(type);
  };

  return (
    <Dialog open={isModalOpened}>
      <DialogContent
        style={{
          padding: 0,
          minWidth: 600,
        }}
      >
        {editingItem ? (
          <> </>
        ) : (
          <>
            <StyledTitle>
              <span> 도메인 추가</span>
              <IconButton onClick={closeModal}>
                <Close />
              </IconButton>
            </StyledTitle>
            <ListItemButton onClick={() => onClickType('xlsm')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='xlsx 파일 import' />
            </ListItemButton>
            <ListItemButton onClick={() => onClickType('manual')}>
              <ListItemIcon>
                <Addbox />
              </ListItemIcon>
              <ListItemText primary='직접 추가' />
            </ListItemButton>
          </>
        )}

        {addType === null && editingItem === null ? (
          <></>
        ) : addType === 'xlsm' ? (
          <ExcelImportModal />
        ) : (
          <DomainRegisterModal />
        )}
      </DialogContent>
    </Dialog>
  );
}
