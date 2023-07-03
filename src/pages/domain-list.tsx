import {styled} from 'styled-components';
import {ListProvider} from '@src/features/ui/listview';
import {DomainListProvider, DomainListContainer, SearchBar} from '@src/features/pages/domain_list';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default function DomainListPage() {
  return (
    <Wrapper>
      <ListProvider>
        <DomainListProvider>
          <SearchBar />
          <DomainListContainer />
        </DomainListProvider>
      </ListProvider>
    </Wrapper>
  );
}
