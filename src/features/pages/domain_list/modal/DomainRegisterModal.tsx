import {Autocomplete, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import {useEffect, useMemo, useState} from 'react';
import {useDomainContext} from '../domain-list.context';
import {DomainAddProps} from 'src/models/request.model';
import ProjectNameAutoCompleteField from '@src/features/ui/project-name-auto-complete-field';
import {DomainAPI} from '@src/api';

const StyledContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px !important;
`;

const StyledDialog = styled.div`
  min-width: 600px;
`;
export default function DomainRegisterModal() {
  const [project, setProject] = useState('');
  const [dataType, setDataType] = useState('');
  const [domain, setDomain] = useState('');
  const [lang, setLang] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const {editingItem, closeModal, setData} = useDomainContext();

  const isModifyMode = useMemo(() => editingItem !== null, [editingItem]);
  const word = useMemo(() => (isModifyMode ? '수정' : '등록'), [isModifyMode]);
  const title = useMemo(() => (isModifyMode ? '도메인 수정' : '새 도메인 추가'), [isModifyMode]);

  useEffect(() => {
    if (editingItem === null) return;
    setProject(editingItem.project);
    setDomain(editingItem.domain);
    setCode(editingItem.code);
    setLang(editingItem.lang);
    setDataType(editingItem.dataType);
    setAbbreviation(editingItem.abbreviation ?? '');
    setDescription(editingItem.description ?? '');
  }, [editingItem]);

  const onClickRegister = async () => {
    if (!code || !project || !dataType || !domain || !lang) {
      alert('값이 빠져있습니다');
      return;
    }

    const data: DomainAddProps = {
      code,
      project,
      dataType,
      domain,
      lang,
      abbreviation,
      description,
    };

    const res = await (editingItem === null
      ? DomainAPI.addDomain(data)
      : DomainAPI.modifyDomain(editingItem.id, data));

    if (res.code === -1) {
      alert(res.msg);
      return;
    }

    if (res.success) {
      alert(`${word}완료`);
      isModifyMode
        ? setData((e) => e.map((data) => (data.id !== editingItem.id ? data : res.data!)))
        : setData((e) => e.concat(res.data!));
      closeModal();
    }
  };

  return (
    <StyledDialog>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <StyledContent>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ProjectNameAutoCompleteField setValue={setProject} value={project} />
        <TextField
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          label={'도메인'}
          placeholder={'도메인'}
        />
        <TextField
          value={code}
          onChange={(e) => setCode(e.target.value)}
          label={'코드'}
          placeholder={'코드'}
        />
        <Autocomplete
          inputValue={lang}
          value={lang}
          onInputChange={(event: any, newValue: string | null) => {
            setLang(newValue ?? '');
          }}
          placeholder={'언어'}
          renderInput={(params) => {
            return <TextField {...params} label={'언어'} />;
          }}
          options={['en', 'ko']}
        />
        <TextField
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          label={'데이터타입'}
          placeholder={'데이터타입'}
        />
        <TextField
          value={abbreviation}
          onChange={(e) => setAbbreviation(e.target.value)}
          label={'약어 (optional)'}
          placeholder={'약어 (optional)'}
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label={'설명 (optional)'}
          placeholder={'설명 (optional)'}
        />
      </StyledContent>
      <DialogActions>
        <Button onClick={closeModal} autoFocus>
          취소
        </Button>
        <Button onClick={onClickRegister}>{word}</Button>
      </DialogActions>
    </StyledDialog>
  );
}
