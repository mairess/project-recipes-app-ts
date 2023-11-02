import React, { createContext, useState } from 'react';

type ContextType = {
  filter: string;
  setFilter: (filter: string) => void;
};

export const FilterContext = createContext({} as ContextType);

export function FilterProvider({ children }: React.PropsWithChildren) {
  const [filter, setFilter] = useState('all');

  return (
    <FilterContext.Provider value={ { filter, setFilter } }>
      {children}
    </FilterContext.Provider>
  );
}
