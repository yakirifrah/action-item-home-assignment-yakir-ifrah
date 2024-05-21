import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { DefaultRoutes } from "../../conf/projectConstant.ts";

const HomeScreen = (): JSX.Element => {
  const navigate = useNavigate();

  const navigateFetch = (): void => {
    navigate(DefaultRoutes.users);
  }

  const navigateHistory = (): void => {
    navigate(DefaultRoutes.History);
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Stack spacing={3} direction='row'>
        <Button onClick={navigateFetch}>Fetch</Button>
        <Button onClick={navigateHistory}>History</Button>
      </Stack>
    </Grid>
  );
}

export default HomeScreen;
