import { useEffect, useState } from 'react';
import { FavoriteRecipe } from '../types';

const useFavoritesLocalStore = () => {
  const [favoritesRecipes, setFavoritesRecipes] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('favoriteRecipes');
    const favorites: FavoriteRecipe[] = storedData ? JSON.parse(storedData) : [];
    setFavoritesRecipes(favorites);
  }, []);

  return {
    favoritesRecipes,
    setFavoritesRecipes,
  };
};

export default useFavoritesLocalStore;
