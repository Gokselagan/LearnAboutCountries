import './App.css';
import { AppRouter } from './AppRouter';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}
