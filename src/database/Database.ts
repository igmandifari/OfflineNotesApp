import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DATABASE_NAME = 'notes.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await SQLite.openDatabase({
    name: DATABASE_NAME,
    location: 'default',
  });

  return dbInstance;
};

export const executeQuery = async (
  query: string,
  params: any[] = [],
) => {
  const db = await getDBConnection();

  const results = await db.executeSql(query, params);

  return results;
};