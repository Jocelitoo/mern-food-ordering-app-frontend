import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi';
import { UserProfileForm } from '@/forms/user-profile-form/UserProfileForm';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return (
      <div
        className="flex flex-col justify-center items-center gap-3
    "
      >
        <AiOutlineLoading3Quarters className="animate-spin size-24" />
        <p>Carregando...</p>
        <p className="text-center">
          <span className="uppercase font-bold">Obs:</span> Caso esteja
          demorando, saiba que é normal demorar um pouco na primeira requisição
          feita à API
        </p>
      </div>
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
