import Grid from '@mui/material/Grid';
import Characters from './pages/Characters';
import Toolbar from './components/Toolbar';

import './main.css';

const App = () => {
  return (
    <>
      <Toolbar />
      <Grid container>
        <Characters />
      </Grid>
    </>
  );
};

export default App;
