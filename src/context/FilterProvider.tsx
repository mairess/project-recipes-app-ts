import { useState } from 'react';
import FilterContext from './FilterContext';

type FilterProviderProps = {
  children: React.ReactNode,
};

function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState('all');

  const handleFilterClick = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <FilterContext.Provider
      value={ {
        filter,
        setFilter,
        handleFilterClick,
      } }
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
