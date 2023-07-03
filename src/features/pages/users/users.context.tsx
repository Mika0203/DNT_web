import {UserAPI} from '@src/api';
import {UserModel} from '@src/models';
import {createContext, ReactNode, useContext, useState} from 'react';

const initValue: {
  data: UserModel[];
  isOpenModal: boolean;

  setData: React.Dispatch<React.SetStateAction<UserModel[]>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: (seq: number) => Promise<void>;
} = {
  data: [],
  isOpenModal: false,

  setData: () => {},
  setIsOpenModal: () => {},
  deleteUser: async (seq) => {},
};

const AuthPageContext = createContext(initValue);

export default function AuthPageProvider({children}: {children: ReactNode}) {
  const [data, setData] = useState(initValue.data);
  const [isOpenModal, setIsOpenModal] = useState(initValue.isOpenModal);

  const deleteUser = async (seq: number) => {
    const res = await UserAPI.deleteUser(seq);
    if (res.success) {
      setData((e) => e.filter((e2) => e2.seq !== seq));
    }
  };

  return (
    <AuthPageContext.Provider
      value={{
        data,
        isOpenModal,
        setIsOpenModal,
        setData,
        deleteUser,
      }}
    >
      {children}
    </AuthPageContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthPageContext);
export {useAuthContext};
