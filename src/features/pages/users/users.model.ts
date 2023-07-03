import {ListHeaderType} from '@src/features/ui/listview/listview.model';

const listHeaderModel: ListHeaderType[] = [
  {
    field: 'name',
    headerName: '이름',
    width: 70,
  },
  {
    field: 'email',
    headerName: '이메일',
    width: 130,
  },
  {
    field: 'sk',
    headerName: 'Security key',
    width: 130,
  },
  {
    field: 'ck',
    headerName: 'Client key',
    width: 130,
  },
];

export {listHeaderModel};
