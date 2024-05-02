import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useCart } from '../Context/CartContext';

const Category = () => {
    const params = useParams();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/product/product-category/${params.category}`
            );
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProduct();
    }, [params.category])

    return (
        <Layout title="Category-TrendVista">
            <div className='container'>
                <h2 className="text-center m-2">{params.category.toUpperCase()}</h2>
                <div className="d-flex flex-wrap justify-content-center">
                    {products?.map((p) => (
                        <div key={p._id}>
                            <div className="card m-2" key={p._id}>
                                <img
                                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <Link className="text-decoration-none text-dark" to={`/product/${p.slug}`}>
                                        <h4 className="card-title">{p.name}</h4>
                                        <p className="card-text">{p.price} &#8377;</p>
                                        <p className="card-text ">{p.description.substring(0, 25)}...</p>
                                    </Link>
                                    <button type="button" className="btn btn-success text-theam bg-header"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}>
                                        <FontAwesomeIcon className="cart text-theam me-3" icon={faCartShopping} />
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Category