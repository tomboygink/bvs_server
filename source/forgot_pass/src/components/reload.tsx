import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, red } from '@mui/material/colors';
import Button from '@mui/material/Button';

import { APP_STORAGE } from '../../../../source/client/src/storage/AppStorage';

export default function CircularIntegration() {
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef<number>();


  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const set_sendCode = () => {
    if(APP_STORAGE.auth_form.getLogin() === ''){
      APP_STORAGE.auth_form.setError_login(true);
      APP_STORAGE.auth_form.setLogin_message('Введите логин')
      }
      else { 
        APP_STORAGE.auth_form.setError_login(false)
        APP_STORAGE.auth_form.setLogin_message('') 
      }

   if(APP_STORAGE.auth_form.getNewPass().length < 6){
    APP_STORAGE.auth_form.setErrr_new_pass(true);
    APP_STORAGE.auth_form.setError_new_message('Пароль должен содержать больше 6 символов.')
   }
   else {
    APP_STORAGE.auth_form.setErrr_new_pass(false);
    APP_STORAGE.auth_form.setError_new_message('')
   }

   if(APP_STORAGE.auth_form.getLogin().length > 1 && APP_STORAGE.auth_form.getLogin() === APP_STORAGE.auth_form.getNewPass() ){
    APP_STORAGE.auth_form.setErrr_new_pass(true);
    APP_STORAGE.auth_form.setError_new_message('Пароль не должен совпадать с логином')
   }

   if(APP_STORAGE.auth_form.getNewPass() !==  APP_STORAGE.auth_form.getRepeatPass()) {
    APP_STORAGE.auth_form.setError_repeat_pass(true);
    APP_STORAGE.auth_form.setError_repeat_message('Пароли не совпадают. Повторите попытку.')
   }
   else{
    APP_STORAGE.auth_form.setError_repeat_pass(false);
    APP_STORAGE.auth_form.setError_repeat_message('')
   }
  
    if (!loading && APP_STORAGE.auth_form.getLogin() !== ''&& APP_STORAGE.auth_form.getNewPass() !==  '' && APP_STORAGE.auth_form.getRepeatPass() !== '') {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
      }, 1000,
      APP_STORAGE.auth_form.set_SaveNewPass());
    }
  };

  return (
    <Box sx={{ }}>
      <Box sx={{position: 'relative' }}>
   
      </Box>
      <Box sx={{position: 'relative' }}>
        <Button
          fullWidth
          sx={{mt:'14px', mb: '14px' ,background: '#edf2ff', color: '#1976d2;' }}
          disabled={loading}
          onClick={set_sendCode}
        >
          Подтвердить
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-1px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
      
    </Box>
  );
}