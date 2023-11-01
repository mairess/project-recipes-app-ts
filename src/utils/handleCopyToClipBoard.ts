import swal from 'sweetalert';
import { FavoriteRecipe } from '../types';

const handleCopuToClipBoard = (recipe: FavoriteRecipe) => {
  const { origin } = window.location;
  let URL = '';

  if (recipe.type === 'meal') {
    URL = `${origin}/meals/${recipe.id}`;
    navigator.clipboard.writeText(URL);
    console.log(origin);
  }

  if (recipe.type === 'drink') {
    URL = `${origin}/drinks/${recipe.id}`;
    navigator.clipboard.writeText(URL);
    console.log(origin);
  }
  swal('Link copied!', '', 'success');
};

export default handleCopuToClipBoard;
