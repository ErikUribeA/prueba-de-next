"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "./style.sass";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Heart, ShoppingCart } from 'lucide-react';

interface IUser {
    _id: string;
    email: string;
    username: string;
    name: string;
    phone: string;
    __v: number;
}


interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    isLiked: boolean;
}

// Componente ProductsPage
const CardProducts: React.FC = () => {
    const { data: session, status } = useSession();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const translate = useTranslations('')

    useEffect(() => {
        const fetchProducts = async () => {
            if (!session || !("access_token" in session)) return;
            try {
                const res = await fetch('http://192.168.88.39:7000/auth/products', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await res.json();
                setProducts(data); // Asume que el endpoint devuelve un array de productos
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [session]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        return <div>No estás autenticado. Por favor inicia sesión.</div>;
    }

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>{translate("title")}</h1>
            <ul className='CharacterList'>
                {products.length > 0 ? (
                    products.map((product) => ( 
                        <div className='card' key={product.id}>
                            <div className='card-image-wrapper'>
                                <Image className='card-image' src={product.image} alt={product.title} fill />
                                <button
                                className={`favorite-button `}
                            >
                                <Heart size={16} />
                            </button>
                            </div>
                            <div className='card-content'>
                                <h2 className='card-title'>{product.title}</h2>
                                <p className='card-price'>{translate("price")}: {product.price}</p>
                                <p className="card-description" >{translate('category')} : {product.category} </p>
                                <button className='add-to-cart-button'>
                                    <ShoppingCart size={16} />
                                    {translate("add")}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No hay productos disponibles.</div>
                )}
            </ul>
        </div>
    );
};

export default CardProducts;
