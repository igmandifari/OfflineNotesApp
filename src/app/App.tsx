import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { runMigrations } from '@/database/migrate';

const App = () => {
  useEffect(() => {
    runMigrations();
  }, []);

  return <AppNavigator />;
};

export default App;