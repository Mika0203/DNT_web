import {Checkbox, TableCell, TableHead, TableRow} from '@mui/material';
import React, {ReactNode} from 'react';
import {styled} from 'styled-components';
import {ListHeaderType} from './listview.model';

const Cell = styled(TableCell)`
  padding: 0 !important;
  text-overflow: ellipsis;
`;

export default function ListHeader({
  headers,
  action,
}: {
  headers: ListHeaderType[];
  action: ReactNode;
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding={'checkbox'}>
          <Checkbox
            color='primary'
            // indeterminate={selectedList.length > 0 && selectedList.length < _data.length}
            // checked={_data.length !== 0 && selectedList.length === _data.length}
            // onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        {headers.map((column) => (
          <Cell width={column.width} key={column.field} align={'center'}>
            {column.headerName}
          </Cell>
        ))}

        <TableCell padding={'checkbox'}>{action}</TableCell>
      </TableRow>
    </TableHead>
  );
}
