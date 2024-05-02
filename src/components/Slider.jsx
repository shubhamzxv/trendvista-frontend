import React, { useEffect, useState } from 'react'
import './slider.css'
import { Link} from 'react-router-dom'
import { useCart } from '../Context/CartContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'

const Slider = () => {
  
  const [cart, setCart] = useCart();
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  //getProduct
  const getProduct1 = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-category/men-shirts`
      );
      setProducts1(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //getProduct
  const getProduct2 = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-category/men-pants`
      );
      setProducts2(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //getProduct
  const getProduct3 = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-category/kids`
      );
      setProducts3(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct1();
    getProduct2();
    getProduct3();
  }, [])
  return (
    // carousel for home page
    <div id="carouselExampleInterval" className="carousel slide carousel-dark" data-bs-ride="carousel">
      <h2 className="text-center">Featured Products</h2>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="3000">
          {/* single slide of corousel */}
          <div className='cards-wrapper'>
            {/* component of card  */}
            {products1?.map((p) => (
              <div className="f-card m-0 p-0 card" key={p._id}>
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
            ))}
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="3000">
          {/* single slide of corousel */}
          <div className='cards-wrapper'>
            {/* component of card  */}
            {products2?.map((p) => (
              <div className="f-card m-0 p-0 card" key={p._id}>
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
            ))}
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="3000">
          {/* single slide of corousel */}
          <div className='cards-wrapper'>
            {/* component of card  */}
            {products3?.map((p) => (
              <div className="f-card m-0 p-0 card" key={p._id}>
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
            ))}
          </div>
        </div>
      </div>
      {/* carousel button for manully changing slide */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Slider