import { Link, Outlet } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div>
      <Outlet />
      <footer data-testid="footer" className={ styles.footer }>
        <Link to="/drinks">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/meals">
          <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
        </Link>

      </footer>
    </div>

  );
}

export default Footer;
