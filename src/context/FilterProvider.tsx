import { useState } from 'react';
import FilterContext from './FilterContext';

type FilterProviderProps = {
  children: React.ReactNode,
};

function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState('all');
  return (
    <FilterContext.Provider
      value={ {
        filter,
        setFilter,
      } }
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
