import {ItemModel} from '@src/models';
import {ReactNode, createContext, useCallback, useContext, useState} from 'react';
import {SearchQuery} from 'src/models/request.model';

const initValue: {
  data: ItemModel[];
  searchParams: SearchQuery;
  loadMore: boolean;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchQuery>>;
  setData: React.Dispatch<React.SetStateAction<ItemModel[]>>;

  nextPage: () => void;
  prevPage: () => void;
  setLoadMore: React.Dispatch<React.SetStateAction<boolean>>;
  onClickAllSelectCheck: (v: ItemModel[]) => void;
  selectedList: string[];
  onCheckItem: (model: ItemModel) => void;
  isSelected: (v: ItemModel) => boolean;
  unSelectItem: (id: string | number) => void;
  unSelectAll: () => void;
} = {
  searchParams: {
    page: 0,
    limit: 30,
  },
  data: [],
  loadMore: false,
  setSearchParams: () => {},
  prevPage: () => {},
  setData: () => {},
  nextPage: () => {},
  setLoadMore: () => {},
  onClickAllSelectCheck: () => {},
  selectedList: [],
  onCheckItem: () => {},
  isSelected: () => false,
  unSelectItem: () => {},
  unSelectAll: () => {},
};

const Context = createContext(initValue);

export default function ListProvider({children}: {children: ReactNode}) {
  const [searchParams, setSearchParams] = useState(initValue.searchParams);
  const [loadMore, setLoadMore] = useState(true);
  const [selectedList, setSelectedList] = useState(initValue.selectedList);
  const [data, setData] = useState<ItemModel[]>(initValue.data);

  const setQuery = useCallback((params: SearchQuery) => {
    setLoadMore(false);
    setSelectedList([]);
    setSearchParams((e) => ({
      ...e,
      ...params,
      page: 0,
    }));
  }, []);

  const prevPage = () => {
    setLoadMore(false);
    setSearchParams({
      ...searchParams,
      page: searchParams.page - 1,
    });
    setLoadMore(true);
  };

  const nextPage = () => {
    setSearchParams({
      ...searchParams,
      page: searchParams.page + 1,
    });
  };

  const onClickAllSelectCheck = (data: ItemModel[]) => {
    if (data.length === selectedList.length) setSelectedList([]);
    else setSelectedList(data.map((e) => (e.id ?? e.seq).toString()));
  };

  const onCheckItem = (data: ItemModel) => {
    const id = (data.id || data.seq).toString();

    if (selectedList.includes(id)) {
      unSelectItem(id);
    } else {
      setSelectedList((e) => e.concat(id));
    }
  };

  const isSelected = (data: ItemModel) => selectedList.includes((data.id ?? data.seq).toString());

  const unSelectItem = (id: string | number) => {
    if (selectedList.includes(id.toString())) {
      setSelectedList((e) => e.filter((e2) => e2 !== id));
    }
  };

  const unSelectAll = () => {
    setSelectedList([]);
  };

  return (
    <Context.Provider
      value={{
        data,
        setData,
        loadMore,
        searchParams,
        prevPage,
        nextPage,
        setLoadMore,
        setSearchParams: setQuery,
        onClickAllSelectCheck,
        selectedList,
        onCheckItem,
        isSelected,
        unSelectItem,
        unSelectAll,
      }}
    >
      {children}
    </Context.Provider>
  );
}
const useListContext = () => useContext(Context);
export {useListContext};
