import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { runMigrations } from '@/database/migrate';
import { executeQuery } from '@/database/Database';

const App = () => {
  useEffect(() => {
    const initDB = async () => {
      await runMigrations();

      const test = async () => {
        const result = await executeQuery(
          "SELECT name FROM sqlite_master WHERE type='table'"
        );
    
        const tables = [];
    
        for (let i = 0; i < result[0].rows.length; i++) {
          tables.push(result[0].rows.item(i));
        }
    
        console.log('TABLES:', tables);
      };
    
      test();
    };

    initDB();
  }, []);
  

  return (
    <View>
      <Text>Offline Notes App</Text>
    </View>
  );
};

export default App;