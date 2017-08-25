import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const Cart = ({products,total,onCheckoutClicked}) => {
    const hasProducts = products.length > 0;
    const nodes = hasProducts ? (
        products.map(product =>
        <Product
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            key={product.id}
        />
        )
    ):(
        <em>please add some products to carrt</em>
    )

    return(
        <div>
            <h3>your cart</h3>
            <div>{nodes}</div>
            <p>total:&#36;{total}</p>
            <button onClick={onCheckoutClicked}
                disabled={hasProducts ? '' : 'disabled'}
            >
                        checkout
            </button>
        </div>
    )
}

Cart.propTypes = {
    products:PropTypes.array,
    total:PropTypes.string,
    onCheckoutClicked:PropTypes.func
}

export default Cart