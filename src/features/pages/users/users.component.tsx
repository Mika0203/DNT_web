import {Button} from '@mui/material';
import {GridAddIcon} from '@mui/x-data-grid';

import {useListContext} from '@src/features/ui/listview';
import {UserAPI} from '@src/api';

import AddUserModal from './users.add-modal';
import ListView from '@src/features/ui/listview';
import {useAuthContext} from './users.context';
import AuthKeyListItem from './users.list-item';
import {listHeaderModel} from './users.model';

export default function AuthKeyList() {
  const {data, setData, setIsOpenModal} = useAuthContext();
  const {searchParams, nextPage, setLoadMore} = useListContext();

  const onIntersect = async () => {
    setLoadMore(false);

    const data = await UserAPI.getUserList(searchParams);
    if (data.success) {
      nextPage();
      setData((e) => e.concat(...data.data.content));
      setLoadMore(data.data.content.length === searchParams.limit);
    }
  };

  return (
    <>
      <AddUserModal />
      <ListView
        action={
          <Button id='basic-button' aria-haspopup='true' onClick={() => setIsOpenModal(true)}>
            <GridAddIcon />
          </Button>
        }
        headers={listHeaderModel}
        onIntersect={onIntersect}
      >
        {data.map((e) => (
          <AuthKeyListItem data={e} key={e.seq} />
        ))}
      </ListView>
    </>
  );
}
