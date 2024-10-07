// app/api/signup/route.ts
import { IResponseCreateUser, IUserRegistered } from '../../../types/userInterface';

export async function createUser(userData: IUserRegistered): Promise<IResponseCreateUser> {
  // Imprime la variable de entorno para ver si está siendo cargada correctamente
  console.log('NEXTAUTH_BD_URL:', process.env.NEXTAUTH_BD_URL);

  const res = await fetch(`http://192.168.88.39:7000/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('Error al crear el usuario');
  }

  return res.json();
}
