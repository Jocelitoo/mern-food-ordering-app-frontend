import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { Layout } from '@/layouts/layout';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { HomePage } from '@/pages/HomePage';
import { UserProfilePage } from '@/pages/UserProfilePage';
import { Navigate, Route, Routes } from 'react-router-dom';

export const RoutesFunction = () => {
  return (
    <Routes>
      {/* A rota(URL) "/" ira renderizar a Home */}
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />

      {/* A rota(URL) "/auth-callback" ira renderizar a página AuthCallbackPage */}
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      {/* A rota(URL) "/user-profile" ira renderizar a página User profile, mas ela só vai ser ativada se o usuário estiver logado */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      {/* Qualquer rota(URL) que não estiver configurada em routes.tsx ira ser redirecionada para a home  */}
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
