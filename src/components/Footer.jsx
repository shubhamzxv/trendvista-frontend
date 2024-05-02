import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-dark text-light'>
            <div className="row mx-0">
                <div className="col-md-3 text-center mx-0">
                    {/* Link to Women's section */}
                    <Link className="text-light text-decoration-none" to="#"><h4 className="mt-3">Women</h4></Link>
                    {/* <!-- Links to specific Men's product categories --> */}
                    <Link className="text-light text-decoration-none" to="/women/products/women-dresses">Dresses</Link><br />
                    <Link className="text-light text-decoration-none" to="/women/products/women-pants">Pants</Link><br />
                    <Link className="text-light text-decoration-none" to="/women/products/women-skirts">Skirts</Link><br />
                </div>
                <div className="col-md-3 text-center mx-0">
                    {/* <!-- Link to Men's section --> */}
                    <Link className="text-light text-decoration-none" to="#"><h4 className="mt-3">Men</h4></Link>
                    {/* <!-- Links to specific Men's product categories --> */}
                    <Link className="text-light text-decoration-none" to="/men/products/men-shirts">Hoodies</Link><br />
                    <Link className="text-light text-decoration-none" to="/men/products/men-pants">Pants</Link><br />
                    <Link className="text-light text-decoration-none" to="/men/products/men-hoodies">Shirts</Link>
                </div>
                <div className="col-md-3 text-center mx-0">
                    {/* <!-- Link to Kids' section --> */}
                    <Link className="text-light text-decoration-none" to="/products/kids"><h4 className="mt-3">Kids</h4></Link>
                </div>
                <div className="col-md-3 text-center mx-0">
                    {/* <!-- Heading for additional links --> */}
                    <Link className="text-light text-decoration-none" to="#"><h4 className="mt-3">Links</h4></Link>
                    {/* <!-- Additional links -->F */}
                    <Link className="text-light text-decoration-none" to="/">Home</Link><br />
                    <Link className="text-light text-decoration-none" to="/registration">SignUp</Link><br />
                    <Link className="text-light text-decoration-none" to="/aboutus">AboutUs</Link>
                </div>
            </div>
            <hr />
            <div className="row mx-0 ">
                <h6 className="py-3 m-0 pt-0 text-center mx-0">Copyright &#169;TrendVista 2023-24</h6>
            </div>
        </div>
    )
}

export default Footer