import { NextResponse } from 'next/server';
import { IResponseCreateUser, IUserRegistered } from '../../../types/userInterface';

async function createUser(userData: IUserRegistered): Promise<IResponseCreateUser> {
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

export async function POST(request: Request) {
  try {
    const userData: IUserRegistered = await request.json();
    const createdUser = await createUser(userData);
    return NextResponse.json(createdUser);
  } catch (error:any) {
    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}
