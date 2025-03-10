import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

const Cart = ({ isAuthenticated, user, products }) => {
    // * Redirects if user is not authenticated 
    if (user!== null && !isAuthenticated) return <Redirect to="/login" />

    const checkout = e => { window.location.href = '/checkout' }

    return user === null
    ? <>Loading...</>
    : (
        <>
            <NavigationBar pageType="authenticated" />
            <main>
                <div className="container-fluid p-5">
                    <div className="row">
                        <div className="col">
                            <div className="container">
                                <div className="row mb-5">
                                    <div className="col text-center">
                                        <h3><b>CART</b></h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <table className="table table-hover align-middle">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    user && user.user_cart.cart_items
                                                    ? (
                                                        user.user_cart.cart_items.map((item, key) => {
                                                            return (
                                                                <tr key={key} onClick={e => { window.location.href = `/product/${item.product.slug}`}}>
                                                                    <th scope="row">
                                                                        <img 
                                                                            src={item.product.image} 
                                                                            alt={item.product.name} 
                                                                            className="m-1 me-3"
                                                                            height="50" 
                                                                            width="50"
                                                                        />
                                                                        {item.product.name}
                                                                    </th>
                                                                    <td>    
                                                                        {
                                                                            item.product.disc_price > 0
                                                                            ? <td>₱ {item.product.disc_price}</td>
                                                                            : <td>₱ {item.product.price}</td>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {item.quantity}
                                                                    </td>
                                                                    <td>₱ {item.total}</td>
                                                                    <td>
                                                                        <button 
                                                                            className="btn"
                                                                            data-bs-toggle="tooltip" 
                                                                            data-bs-placement="top" 
                                                                            title="Remove product from Shopping Bag"
                                                                        >-</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                    : (
                                                        <tr className="text-center">
                                                            <td colSpan="4">Your shopping bag is empty.</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {
                                    (user && Object.keys(user.user_cart.cart_items).length > 0)
                                    && (
                                        <div className="row">
                                            <div className="col text-end">
                                                <button 
                                                    className="btn btn-primary" 
                                                    onClick={e => checkout(e)}
                                                >Proceed to Checkout</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="row" style={{ backgroundColor: "#beb7a3" }}>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <h6>Cart Overview</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p>Total:</p>
                                        </div>
                                        <div className="col">
                                            {
                                                user
                                                && <h6>₱ {user.user_cart.total}</h6>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p>Deliver to:</p>
                                        </div>
                                        <div className="col">
                                            {
                                                user && user.user_address
                                                && (
                                                    <h6>
                                                        <span>{user.user_address.address_line1}{
                                                            user.user_address.address_line1
                                                            && ', '
                                                        }</span>
                                                        <span>{user.user_address.brgy}{
                                                            user.user_address.brgy
                                                            && ', '
                                                        }</span>
                                                        <span>{user.user_address.city}, </span>
                                                        <span>{user.user_address.province}</span>
                                                    </h6>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    products: state.products.products
})

export default connect(mapStateToProps, {})(Cart);