import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {DomainModel} from '@src/models';
import {useListContext} from '@src/features/ui/listview';

const initValue: {
  data: DomainModel[];
  openModal: () => void;
  closeModal: () => void;
  editingItem: DomainModel | null;
  setData: React.Dispatch<React.SetStateAction<DomainModel[]>>;
  setEditingItem: React.Dispatch<React.SetStateAction<DomainModel>>;
  isModalOpened: boolean;
} = {
  data: [],
  editingItem: null,
  setData: () => {},
  setEditingItem: () => {},
  openModal: () => {},
  closeModal: () => {},
  isModalOpened: false,
};

const DomainListContext = createContext(initValue);

export default function DomainListProvider({children}: {children: ReactNode}) {
  const [editingItem, setEditingItem] = useState<DomainModel | null>(initValue.editingItem);
  const [data, setData] = useState<DomainModel[]>(initValue.data);
  const [isModalOpen, setModalOpen] = useState(false);
  const {searchParams, setLoadMore} = useListContext();

  const isModalOpened = useMemo(() => {
    return isModalOpen || editingItem !== null;
  }, [isModalOpen, editingItem]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingItem(null);
    setModalOpen(false);
  };

  const onSearchParamsChanged = useCallback(() => {
    setData([]);
    setLoadMore(true);
  }, [setLoadMore]);

  useEffect(() => {
    setLoadMore(false);
    onSearchParamsChanged();
  }, [onSearchParamsChanged, searchParams.project, setLoadMore]);

  return (
    <DomainListContext.Provider
      value={{
        isModalOpened,
        editingItem,
        setEditingItem,
        setData,
        data,
        openModal,
        closeModal,
      }}
    >
      {children}
    </DomainListContext.Provider>
  );
}

const useDomainContext = () => useContext(DomainListContext);
export {useDomainContext};
