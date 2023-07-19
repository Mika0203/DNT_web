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
  init: () => void;
} = {
  data: [],
  editingItem: null,
  setData: () => {},
  setEditingItem: () => {},
  openModal: () => {},
  closeModal: () => {},
  isModalOpened: false,
  init: () => {},
};

const DomainListContext = createContext(initValue);

export default function DomainListProvider({children}: {children: ReactNode}) {
  const [editingItem, setEditingItem] = useState<DomainModel | null>(initValue.editingItem);
  const [data, setData] = useState<DomainModel[]>(initValue.data);
  const [isModalOpen, setModalOpen] = useState(false);
  const {searchParams, setSearchParams, setLoadMore} = useListContext();
  const setListData = useListContext().setData;

  const isModalOpened = useMemo(
    () => isModalOpen || editingItem !== null,
    [isModalOpen, editingItem]
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setEditingItem(null);
    setModalOpen(false);
  };

  const onSearchParamsChanged = useCallback(() => {
    setSearchParams({
      page: 0,
    });
    setData([]);
    setLoadMore(true);
  }, [setLoadMore, setSearchParams]);

  useEffect(() => {
    setLoadMore(false);
    onSearchParamsChanged();
  }, [onSearchParamsChanged, searchParams.project, setLoadMore]);

  useEffect(() => {
    setListData(data);
  }, [data, setListData]);

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
        init: onSearchParamsChanged,
      }}
    >
      {children}
    </DomainListContext.Provider>
  );
}

const useDomainContext = () => useContext(DomainListContext);
export {useDomainContext};
