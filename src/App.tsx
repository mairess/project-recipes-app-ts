import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import { Meals } from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';
import DoneRecipes from './components/DoneRecipes';
import Footer from './components/Footer';
import RecipeContext from './components/context/RecipesContext';

function App() {
  const [recipesContext, setRecipesContext] = useState<true | false>(true);
  function toggleRecipes() {
    setRecipesContext((prevContext) => !prevContext);
  }
  return (
    <RecipeContext.Provider value={ { recipes: recipesContext, toggleRecipes } }>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Footer /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />

      </Routes>

    </RecipeContext.Provider>

  );
}

export default App;
