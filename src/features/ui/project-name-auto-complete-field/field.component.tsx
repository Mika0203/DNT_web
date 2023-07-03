import {Autocomplete, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {DomainAPI} from 'src/api';

export default function ProjectNameAutoCompleteField({
  value,
  setValue,
  freeSolo,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  freeSolo?: boolean;
}) {
  const [projectNameList, setProjectNameList] = useState<string[]>([]);
  useEffect(() => {
    DomainAPI.getProjectNameList().then((e) => setProjectNameList(e.data));
  }, []);

  return (
    <Autocomplete
      freeSolo={freeSolo ?? true}
      inputValue={value}
      onInputChange={(event: any, newValue: string | null) => {
        setValue(newValue ?? '');
      }}
      placeholder={'프로젝트'}
      renderInput={(params) => <TextField {...params} label={'프로젝트'} />}
      options={projectNameList}
    />
  );
}
