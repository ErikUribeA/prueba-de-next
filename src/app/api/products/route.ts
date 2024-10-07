import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth/[...nextauth]/route"; 

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
    console.log(products)

    return NextResponse.json({
        products,
    }, { status: 200 });
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    console.log('Received POST data:', data);

    return NextResponse.json({
        message: 'POST: Hello from Next.js!',
        data: data,
    }, { status: 200 });
}
