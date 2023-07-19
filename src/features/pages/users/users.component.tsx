import {Button} from '@mui/material';
import {GridAddIcon} from '@mui/x-data-grid';

import {useListContext} from '@src/features/ui/listview';
import {UserAPI} from '@src/api';

import AddUserModal from './users.add-modal';
import ListView from '@src/features/ui/listview';
import {useAuthContext} from './users.context';
import AuthKeyListItem from './users.list-item';
import {listHeaderModel} from './users.model';
import {Delete} from '@mui/icons-material';
import {useState} from 'react';
import {DeleteSelectedItemsModal} from './modal';

export default function AuthKeyList() {
  const {data, setData, setIsOpenModal} = useAuthContext();
  const {searchParams, nextPage, setLoadMore} = useListContext();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const onIntersect = async () => {
    setLoadMore(false);

    const data = await UserAPI.getUserList(searchParams);
    if (data.success) {
      nextPage();
      setData((e) => e.concat(...data.data.content));
      setLoadMore(data.data.content.length === searchParams.limit);
    }
  };

  const onClickToDeleteSelectedItems = () => setIsOpenDeleteModal(true);

  return (
    <>
      <AddUserModal />
      <ListView
        headers={listHeaderModel}
        onIntersect={onIntersect}
        action={
          <Button id='basic-button' aria-haspopup='true' onClick={() => setIsOpenModal(true)}>
            <GridAddIcon />
          </Button>
        }
        selectAction={
          <Button id='basic-button' aria-haspopup='true' onClick={onClickToDeleteSelectedItems}>
            <Delete />
          </Button>
        }
      >
        {data.map((e) => (
          <AuthKeyListItem data={e} key={e.seq} />
        ))}

        <DeleteSelectedItemsModal
          onClose={() => setIsOpenDeleteModal(false)}
          isOpen={isOpenDeleteModal}
        />
      </ListView>
    </>
  );
}
