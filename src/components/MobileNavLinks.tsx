import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';

export const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link to="/order-status" className="font-bold hover:text-orange-500">
        Status dos pedidos
      </Link>

      <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
        Administrar restaurante
      </Link>

      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Perfil do usuário
      </Link>

      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500"
        onClick={() => logout()}
      >
        Sair
      </Button>
    </>
  );
};
