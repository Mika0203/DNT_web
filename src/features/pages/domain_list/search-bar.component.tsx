import {Button, TextField} from '@mui/material';
import {styled} from 'styled-components';
import {useState} from 'react';
import ProjectNameAutoCompleteField from '@src/features/ui/project-name-auto-complete-field';
import {useListContext} from '@src/features/ui/listview';

const Wrapper = styled.div`
  padding: 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  > div {
    flex: 1;
  }
`;

const Buttons = styled.span`
  display: flex;
  gap: 6px;
`;

export default function SearchBar() {
  const [project, setProject] = useState('');
  const [lang, setLang] = useState('');
  const [search, setSearch] = useState('');
  const {setSearchParams} = useListContext();

  const onClickSearch = () => {
    const params = {
      project,
      lang,
      search,
      page: 0,
    };
    setSearchParams(params);
  };

  const onClickInit = () => {
    setProject('');
    setLang('');
    setSearch('');
    setSearchParams({
      project: '',
      lang: '',
      search: '',
      page: 0,
    });
  };

  return (
    <Wrapper>
      <span>검색</span>
      <ProjectNameAutoCompleteField freeSolo={true} value={project} setValue={setProject} />
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        label={'도메인 검색'}
        placeholder={'도메인 검색'}
      />
      <Buttons>
        <Button onClick={onClickSearch} variant='contained'>
          검색
        </Button>
        <Button onClick={onClickInit} variant='contained'>
          초기화
        </Button>
      </Buttons>
    </Wrapper>
  );
}
