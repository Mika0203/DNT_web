import {ListHeaderType} from '@src/features/ui/listview/listview.model';

const listHeaderModel: ListHeaderType[] = [
  {
    field: 'project',
    headerName: '프로젝트',
    width: 150,
  },
  {
    field: 'domain',
    headerName: '도메인',
    width: 150,
  },
  {
    field: 'code',
    headerName: '코드',
    width: 150,
  },
  {
    field: 'lang',
    headerName: '언어',
    width: 80,
  },
  {
    field: 'dataType',
    headerName: '데이터 타입',
    width: 120,
  },
  {
    field: 'abbreviation',
    headerName: '약어',
    width: 150,
  },
  {
    field: 'viewType',
    headerName: '설명',
    width: 200,
  },
  {
    field: 'count',
    headerName: '사용 카운트',
    width: 70,
  },
];

export {listHeaderModel};
