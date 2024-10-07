import { IResponseCreateUser, IUserRegistered } from '../../../types/userInterface';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Función para crear un usuario
export async function createUser(userData: IUserRegistered): Promise<IResponseCreateUser> {
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

// Manejo de la solicitud GET
export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.access_token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const res = await fetch('http://192.168.88.39:7000/auth/products', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
        },
    });

    const products = await res.json();
    console.log(products);

    return NextResponse.json({ products }, { status: 200 });
}

// Manejo de la solicitud POST
export async function POST(request: NextRequest) {
    const data = await request.json();
    console.log('Received POST data:', data);

    return NextResponse.json({
        message: 'POST: Hello from Next.js!',
        data: data,
    }, { status: 200 });
}
