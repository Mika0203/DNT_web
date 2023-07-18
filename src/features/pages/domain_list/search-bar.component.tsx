import {Button, TextField} from '@mui/material';
import {styled} from 'styled-components';
import {useState} from 'react';
import ProjectNameAutoCompleteField from '@src/features/ui/project-name-auto-complete-field';
import {useListContext} from '@src/features/ui/listview';
import {ExcelUtils, excelDefaultHeader} from '@src/utils';
import {DomainAPI} from '@src/api';

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
  const {setSearchParams, searchParams} = useListContext();

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

  const onClickExportExcel = async () => {
    const projectName = project;

    if (!projectName) {
      alert('프로젝트를 선택 후 시도해주세요');
      return;
    }

    const data = await DomainAPI.getList({
      ...searchParams,
      project: projectName,
      page: 0,
      limit: 9999,
    });
    if (data.success) {
      ExcelUtils.download(projectName, {
        headers: excelDefaultHeader,
        data: data.data,
      });
    } else {
      alert('데이터 로드 실패');
    }
  };

  return (
    <Wrapper>
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
        <Button onClick={onClickExportExcel} variant='contained'>
          엑셀 추출
        </Button>
      </Buttons>
    </Wrapper>
  );
}
