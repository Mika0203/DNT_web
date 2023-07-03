import {ReactNode, createContext, useContext, useState} from 'react';
import {SearchQuery} from 'src/models/request.model';

const initValue: {
  searchParams: SearchQuery;
  loadMore: boolean;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchQuery>>;
  nextPage: () => void;
  setLoadMore: React.Dispatch<React.SetStateAction<boolean>>;
} = {
  searchParams: {
    page: 0,
    limit: 30,
  },
  loadMore: false,
  setSearchParams: () => {},
  nextPage: () => {},
  setLoadMore: () => {},
};

const Context = createContext(initValue);

export default function ListProvider({children}: {children: ReactNode}) {
  const [searchParams, setSearchParams] = useState(initValue.searchParams);
  const [loadMore, setLoadMore] = useState(true);

  const setQuery = (params: SearchQuery) => {
    console.log('on Click Search');
    setLoadMore(false);
    setSearchParams({
      ...searchParams,
      ...params,
      page: 0,
    });
  };

  const nextPage = () => {
    setSearchParams({
      ...searchParams,
      page: searchParams.page + 1,
    });
  };

  return (
    <Context.Provider
      value={{
        loadMore,
        searchParams,
        nextPage,
        setLoadMore,
        setSearchParams: setQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
}
const useListContext = () => useContext(Context);
export {useListContext};
