import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RoundsPage, RoundPage } from '@/pages';
import { ProtectedRoute } from '@/components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/rounds"
          element={
            <ProtectedRoute>
              <RoundsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rounds/:id"
          element={
            <ProtectedRoute>
              <RoundPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/rounds" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
