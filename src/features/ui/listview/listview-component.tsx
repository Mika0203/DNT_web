import {Table, TableBody, TableContainer} from '@mui/material';
import {ReactNode} from 'react';

import ListHeader from './listview.header';
import {ListHeaderType} from './listview.model';
import {useListContext} from './listview.context';
import LoadingItem from './listview-loading.component';

export default function ListView({
  children,
  onIntersect,
  action,
  headers,
  selectAction,
}: {
  children: ReactNode;
  onIntersect: () => void;
  action?: ReactNode;
  selectAction?: ReactNode;
  headers: ListHeaderType[];
}) {
  const {loadMore} = useListContext();

  return (
    <>
      <TableContainer onSelect={(e) => {}}>
        <Table stickyHeader aria-label='sticky table'>
          <ListHeader headers={headers} action={action} selectAction={selectAction} />
          <TableBody>{children}</TableBody>
        </Table>
        {loadMore && <LoadingItem onIntersect={onIntersect} />}
      </TableContainer>
    </>
  );
}
