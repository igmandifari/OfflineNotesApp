import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-sqlite-storage', () => ({
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() => ({
    executeSql: jest.fn(() => Promise.resolve([{ rows: { length: 0 } }])),
  })),
}));

jest.mock('react-native-gesture-handler', () => {
  return {
    Swipeable: ({ children }) => children,
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  })),
}));