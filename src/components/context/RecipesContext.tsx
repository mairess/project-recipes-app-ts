import { createContext } from 'react';

type ProviderContextType = {
  recipes: true | false;
  toggleRecipes: () => void;
};

const RecipeContext = createContext({} as ProviderContextType);

export default RecipeContext;
