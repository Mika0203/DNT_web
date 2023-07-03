import {Table, TableBody, TableContainer} from '@mui/material';
import ListHeader from './listview.header';
import {ReactNode} from 'react';
import LoadingItem from 'src/features/ui/listview/listview-loading.component';
import {ListHeaderType} from './listview.model';
import {useListContext} from './listview.context';

export default function ListView({
  children,
  onIntersect,
  action,
  headers,
}: {
  children: ReactNode;
  onIntersect: () => void;
  action?: ReactNode;
  headers: ListHeaderType[];
}) {
  const {loadMore} = useListContext();

  return (
    <>
      <TableContainer onSelect={(e) => {}}>
        <Table stickyHeader aria-label='sticky table'>
          <ListHeader headers={headers} action={action} />
          <TableBody>{children}</TableBody>
        </Table>
        {loadMore && <LoadingItem onIntersect={onIntersect} />}
      </TableContainer>
    </>
  );
}
