import {UserAPI} from '@src/api';
import {useListContext} from '@src/features/ui/listview';
import {UserModel} from '@src/models';
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';

const initValue: {
  data: UserModel[];
  isOpenModal: boolean;

  setData: React.Dispatch<React.SetStateAction<UserModel[]>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: (seq: number) => Promise<void>;
  init;
} = {
  data: [],
  isOpenModal: false,

  setData: () => {},
  setIsOpenModal: () => {},
  deleteUser: async (seq) => {},
  init: () => {},
};

const AuthPageContext = createContext(initValue);

export default function AuthPageProvider({children}: {children: ReactNode}) {
  const [data, setData] = useState(initValue.data);
  const [isOpenModal, setIsOpenModal] = useState(initValue.isOpenModal);
  const setListData = useListContext().setData;
  const {searchParams, setSearchParams, setLoadMore} = useListContext();

  const deleteUser = async (seq: number) => {
    const res = await UserAPI.deleteUser(seq);
    if (res.success) {
      setData((e) => e.filter((e2) => e2.seq !== seq));
    }
  };

  useEffect(() => {
    setListData(data);
  }, [data, setListData]);

  const init = useCallback(() => {
    setSearchParams({
      page: 0,
    });
    setData([]);
    setLoadMore(true);
  }, [setLoadMore, setSearchParams]);

  return (
    <AuthPageContext.Provider
      value={{
        data,
        isOpenModal,
        setIsOpenModal,
        setData,
        deleteUser,
        init,
      }}
    >
      {children}
    </AuthPageContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthPageContext);
export {useAuthContext};
