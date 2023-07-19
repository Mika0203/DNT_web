import {TableRow, TableCell, Checkbox} from '@mui/material';
import {DomainModel} from '@src/models';
import DomainMenu from './menu';
import {useListContext} from '@src/features/ui/listview';

export default function DomainListItem({data}: {data: DomainModel}) {
  const {isSelected, onCheckItem} = useListContext();

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell padding={'checkbox'}>
        <Checkbox
          color='primary'
          checked={isSelected(data)}
          onChange={(e) => onCheckItem(data)}
          inputProps={{
            'aria-label': 'select all desserts',
          }}
        />
      </TableCell>
      <TableCell align={'center'}>{data.project}</TableCell>
      <TableCell align={'center'}>{data.domain}</TableCell>
      <TableCell align={'center'}>{data.code}</TableCell>
      <TableCell align={'center'}>{data.lang}</TableCell>
      <TableCell align={'center'}>{data.dataType}</TableCell>
      <TableCell align={'center'}>{data.abbreviation}</TableCell>
      <TableCell align={'center'}>{data.description}</TableCell>
      <TableCell align={'center'}>{data.usedCount}</TableCell>
      <DomainMenu data={data} />
    </TableRow>
  );
}
