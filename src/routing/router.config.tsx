import {ReactElement} from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Account from '@mui/icons-material/AccountCircle';
import DomainListPage from '@src/pages/domain-list';
import UserListPage from '@src/pages/user';

type Route = {
  label: string;
  route: string;
  icon?: ReactElement;
  page: ReactElement;
};

const RouterConfig: Route[] = [
  {
    label: '리스트',
    route: '/list',
    icon: <InboxIcon />,
    page: <DomainListPage />,
  },
  {
    label: '키 관리',
    route: '/auth',
    icon: <Account />,
    page: <UserListPage />,
  },
];

export {RouterConfig};
