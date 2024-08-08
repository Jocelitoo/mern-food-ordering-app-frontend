import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { Layout } from '@/layouts/layout';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { DetailPage } from '@/pages/DetailsPage';
import { HomePage } from '@/pages/HomePage';
import { ManageRestaurantPage } from '@/pages/ManageRestaurantPage';
import { SearchPage } from '@/pages/SearchPage';
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

      {/* A rota(URL) "/user-profile" ira renderizar a página User profile, mas ela só vai ser renderizada se o usuário estiver logado */}
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

      {/* A rota(URL) "/manage-restaurant" ira renderizar a página Mane Restaurant, mas ela só vai ser renderizada se o usuário estiver logado */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />

      {/* Qualquer rota(URL) que não estiver configurada em routes.tsx ira ser redirecionada para a home  */}
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
