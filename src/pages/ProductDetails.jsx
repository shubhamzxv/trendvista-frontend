import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
    const params = useParams();
    const [cart, setCart] = useCart();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initial details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <Layout>
            <div className="row m-0">
                <div className="col-lg-5 p-2 text-center">
                    <img
                        src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
                        className="responsive-img"
                        alt={product.name}
                        height="350"
                        width={"300px"}
                    />
                </div>
                <div className="col-lg-6 my-2">
                    <p className='text-info'>#JustHere</p>
                    <h6>{product.name}</h6>
                    <h6>{product.description}</h6>
                    <h6>{product.price} &#8377;</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    
                    <h6>Available offers</h6>
                    <p>Bank Offer 5% Cashback on Flipkart Axis Bank CardT&C</p>
                    <p>Bank Offer 10% Instant Discount on BOBCARD Transactions, up to ₹1,000 on orders of ₹7,500 and aboveT&C</p>
                    <p>Bank Offer 10% off on Citi-branded Credit Card EMI Transactions, up to ₹2,000 on orders of ₹5,000 and aboveT&C</p>

                    <div className='text-center'>
                        <button type="button" className="btn btn-success text-theam bg-header"
                            onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, product])
                                );
                                toast.success("Item Added to cart");
                            }}>
                            <FontAwesomeIcon className="cart text-theam me-3" icon={faCartShopping} />
                            Add to cart
                        </button>
                    </div>

                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h4 className='text-center'>Similar Products</h4>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap justify-content-center">
                    {relatedProducts?.map((p) => (
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

export default ProductDetails