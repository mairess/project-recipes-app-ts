import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { Meals } from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';
import DoneRecipes from './components/DoneRecipes';
import Footer from './components/Footer';

function App() {
  return (
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
  );
}

export default App;
