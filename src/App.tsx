// src/App.tsx
import React from 'react';
import AppRouter from './router/AppRouter';
import { MessageProvider } from './context/MessageContext';

const App: React.FC = () => {
  return (
    <MessageProvider>
      <AppRouter />
    </MessageProvider>
  );
};

export default App;
