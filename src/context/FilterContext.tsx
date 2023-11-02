import { createContext } from 'react';
import { FavoriteRecipe } from '../types';

type ContextType = {
  filter: string;
  setFilter: (filter: string) => void;
  handleFilterClick: (newFilter: string) => void;
  // filteredFavorites: FavoriteRecipe[];
};

const FilterContext = createContext({} as ContextType);

export default FilterContext;
