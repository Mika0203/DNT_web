import styled from 'styled-components';
import {GridAddIcon} from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import ListView, {useListContext} from '@src/features/ui/listview';
import {DomainAPI} from '@src/api';

import DomainListItem from './domain-item.component';
import {useDomainContext} from './domain-list.context';
import {listHeaderModel} from './domain-list.model';
import {DeleteSelectedItemsModal, DomainAddSelectTypeModal} from './modal';
import {Delete} from '@mui/icons-material';
import {useCallback, useState} from 'react';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: space-between;
`;

export default function DomainListContainer() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const {data, setData, openModal} = useDomainContext();
  const {searchParams, nextPage, setLoadMore} = useListContext();

  const onIntersect = useCallback(async () => {
    setLoadMore(false);
    console.log(`Load ${searchParams.page}`);
    const res = await DomainAPI.getList(searchParams);
    if (res.success) {
      nextPage();
      setData((e) => e.concat(...res.data));
      setLoadMore(res.data.length === searchParams.limit);
    }
  }, [nextPage, searchParams, setData, setLoadMore]);

  const onClickToDeleteSelectedItems = () => setIsOpenDeleteModal(true);

  return (
    <ListWrapper>
      <ListView
        headers={listHeaderModel}
        onIntersect={onIntersect}
        action={
          <Button id='basic-button' aria-haspopup='true' onClick={openModal}>
            <GridAddIcon />
          </Button>
        }
        selectAction={
          <Button id='basic-button' aria-haspopup='true' onClick={onClickToDeleteSelectedItems}>
            <Delete />
          </Button>
        }
      >
        {data.map((row) => (
          <DomainListItem key={row.id} data={row} />
        ))}
      </ListView>
      <DeleteSelectedItemsModal
        onClose={() => setIsOpenDeleteModal(false)}
        isOpen={isOpenDeleteModal}
      />
      <DomainAddSelectTypeModal />
    </ListWrapper>
  );
}
