import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi';
import { UserProfileForm } from '@/forms/user-profile-form/UserProfileForm';

export const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return (
      <span>
        Carregando... (Caso demore, é normal demorar um pouco na primeira
        requisição feita à API)
      </span>
    );
  }

  if (!currentUser) {
    return <span>Não foi possível carregar o perfil do usuário</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};
