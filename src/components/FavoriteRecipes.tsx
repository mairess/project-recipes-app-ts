import FilterBar from './FilterBar';
import Header from './Header';
import Cards from './Card';
import FilterProvider from '../context/FilterProvider';

export default function FavoriteRecipes() {
  return (
    <FilterProvider>
      <div>
        <Header />
        <FilterBar />
        <Cards />
      </div>
    </FilterProvider>
  );
}
