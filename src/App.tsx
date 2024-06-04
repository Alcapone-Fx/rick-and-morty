import Grid from '@mui/material/Grid';
import Characters from './pages/Characters';
import Toolbar from './components/Toolbar';

import './main.css';

const App = () => {
  return (
    <>
      <Toolbar />
      <Grid container>
        <Grid item xs={3}>
          Filters
        </Grid>
        <Grid item xs={9}>
          <Characters />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
