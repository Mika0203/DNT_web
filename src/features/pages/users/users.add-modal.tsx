import {Button, Dialog, TextField} from '@mui/material';
import {styled} from 'styled-components';
import {useState} from 'react';
import {useAuthContext} from './users.context';
import {UserAPI} from '@src/api';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
  min-width: 500px;
  justify-content: center;
  height: 100%;
  flex: 1;
`;

export default function AddUserModal() {
  const {setData, setIsOpenModal, isOpenModal} = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickToSubmit = async () => {
    if (!name || !email || !password) {
      alert('값이 비어있습니다');
      return;
    }

    const res = await UserAPI.addUser({
      name,
      email,
      password,
      securityKey: crypto.randomUUID().replaceAll('-', ''),
      clientId: crypto.randomUUID().replaceAll('-', ''),
    });

    if (res.success) {
      setData((e) => [res.data, ...e]);
      setIsOpenModal(false);
      setName('');
      setEmail('');
      setPassword('');
    } else {
      alert(res.msg);
    }
  };

  return (
    <Dialog open={isOpenModal} onClose={() => setIsOpenModal(false)}>
      <StyledWrapper>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label={'이름'}
          placeholder={'이름'}
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label={'이메일'}
          placeholder={'이메일'}
        />
        <TextField
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label={'비밀번호'}
          placeholder={'비밀번호'}
        />
        <Button onClick={onClickToSubmit} variant={'contained'}>
          키 생성
        </Button>
      </StyledWrapper>
    </Dialog>
  );
}
