// import React, { createContext, useState } from 'react';
import { createContext } from 'react';

type ContextType = {
  filter: string;
  setFilter: (filter: string) => void;
};

const FilterContext = createContext({} as ContextType);

export default FilterContext;
// export function FilterProvider({ children }: React.PropsWithChildren) {
//   const [filter, setFilter] = useState('all');

//   return (
//     <FilterContext.Provider value={ { filter, setFilter } }>
//       {children}
//     </FilterContext.Provider>
//   );
// }
