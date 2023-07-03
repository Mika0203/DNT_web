import AuthKeyList, {AuthPageProvider} from '@src/features/pages/users';
import {ListProvider} from '@src/features/ui/listview';
import {styled} from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default function UserListPage() {
  return (
    <ListProvider>
      <AuthPageProvider>
        <StyledWrapper>
          <AuthKeyList />
        </StyledWrapper>
      </AuthPageProvider>
    </ListProvider>
  );
}
