import { useState } from 'react';
import FilterContext from './FilterContext';
import useFavoritesLocalStore from '../hooks/useFavoritesLocalStore';

type FilterProviderProps = {
  children: React.ReactNode,
};

function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState('all');
  const { favoritesRecipes, setFavoritesRecipes } = useFavoritesLocalStore();

  const handleFilterClick = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleRemoveFavorite = (recipeId: string) => {
    const updatedFavorites = favoritesRecipes.filter((recipe) => recipe.id !== recipeId);
    setFavoritesRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  return (
    <FilterContext.Provider
      value={ {
        filter,
        setFilter,
        handleFilterClick,
        handleRemoveFavorite,
      } }
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
