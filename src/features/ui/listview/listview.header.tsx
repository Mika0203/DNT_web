import {Checkbox, TableCell, TableHead, TableRow} from '@mui/material';
import {ReactNode} from 'react';
import {styled} from 'styled-components';

import {useDomainContext} from '@src/features/pages/domain_list';

import {ListHeaderType} from './listview.model';
import {useListContext} from './listview.context';

const Cell = styled(TableCell)`
  padding: 0 !important;
  text-overflow: ellipsis;
`;

export default function ListHeader({
  headers,
  action,
  selectAction,
}: {
  headers: ListHeaderType[];
  action: ReactNode;
  selectAction?: ReactNode;
}) {
  const {onClickAllSelectCheck, selectedList, data} = useListContext();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding={'checkbox'}>
          <Checkbox
            color='primary'
            indeterminate={selectedList.length > 0 && selectedList.length < data.length}
            checked={data.length !== 0 && selectedList.length === data.length}
            onChange={() => onClickAllSelectCheck(data)}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        {selectedList.length > 0 ? (
          <>
            {headers.map((column, idx) => (
              <Cell width={column.width} key={column.field} align={'center'}>
                {idx === 0 && <>{selectedList.length}개 선택됨</>}
              </Cell>
            ))}
            <TableCell padding={'checkbox'}>{selectAction}</TableCell>
          </>
        ) : (
          <>
            {headers.map((column) => (
              <Cell width={column.width} key={column.field} align={'center'}>
                {column.headerName}
              </Cell>
            ))}
            <TableCell padding={'checkbox'}>{action}</TableCell>
          </>
        )}
      </TableRow>
    </TableHead>
  );
}
