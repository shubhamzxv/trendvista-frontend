import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../Context/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const SearchResult = () => {
    const [values] = useSearch();
    const [cart, setCart] = useCart();
  return (
    <Layout title={"Search Result -TrendVista" }>
        <div className="container">
            <div>
                  <h2 className="text-center">Search Result</h2>
                  <h6 className="text-center">
                      {values?.results.length < 1
                          ? "No Products Found"
                          : `Found ${values?.results.length}`}
                  </h6>
                  <div className="d-flex flex-wrap mt-4 justify-content-center">
                      {values?.results.map((p) => (
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
        </div>
    </Layout>
  )
}

export default SearchResult