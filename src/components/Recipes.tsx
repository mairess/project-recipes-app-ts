import Drinks from './Drinks';
import { Meals } from './Meals';

function Recipes() {
  const rotaDrinks = window.location.pathname.includes('drinks');

  return (
    <span>
      { rotaDrinks ? <Drinks /> : <Meals /> }
    </span>
  );
}

export default Recipes;
