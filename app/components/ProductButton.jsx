'use client';
import { useRouter } from 'next/navigation';

import React from 'react';

const ProductButton = ({id}) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/products/${id}`)
    }

    return (
        <button onClick={handleClick} className="cursor-pointer bg-green-200 p-2">
            Go to Product
        </button>
    )
}

export default ProductButton