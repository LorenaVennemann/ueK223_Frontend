import { Box } from '@mui/system';
import logo from '../../logo1.png';
import { useContext } from 'react';
import ActiveUserContext from '../../Contexts/ActiveUserContext';
import { error } from 'console';

export default function HomePage() {
  const context = useContext(ActiveUserContext);
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection={'column'}
    >
      <h1>Welcome to the Homepage</h1>
      <img
        src={logo}
        style={{ filter: 'invert(100%)' }}
        className='App-logo'
        alt='logo'
      />
    </Box>
  );
}
