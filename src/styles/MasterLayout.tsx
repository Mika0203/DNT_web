import {Outlet} from 'react-router-dom';
import styled from 'styled-components';
import {Box} from '@mui/material';

import DrawerContainer from '@src/features/ui/drawer';

const Wrapper = styled(Box)`
  display: flex;
  height: 100%;
`;

export default function MasterLayout() {
  return (
    <Wrapper bgcolor={'background.paper'}>
      <DrawerContainer />
      <Outlet />
    </Wrapper>
  );
}
