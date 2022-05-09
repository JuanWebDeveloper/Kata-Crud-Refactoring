import { Main } from './components/Main';
import { Provider } from 'react-redux';

// Store of the application
import { store } from './store/store';

// Aplication Styles
import './assets/sass/styles.scss';
import 'animate.css';

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
