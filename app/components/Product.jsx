import React from 'react'
import ProductButton from './ProductButton'

const Product = ({ id, title, price, noButton = false }) => {
    return (
        <div className="border-4 border-white rounded m-4 p-4">
            <h4>{title}</h4>
            <p>{price}</p>
            {
                !noButton && <ProductButton id={id} />
            }
        </div>
    )
}

export default Product