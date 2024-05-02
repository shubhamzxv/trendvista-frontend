import React from 'react'
import Layout from '../components/Layout'

const ContactUs = () => {
    return (
        // Aboutus page
        <Layout title="ContactUs-TrendVista">
            <h2 className="text-center mt-2">About TrendVista</h2>
            <div className="row m-4">
                <div className="col">
                    {/* <!-- row for form --> */}
                    <form>
                        <h4>
                            About Us
                        </h4>
                        <p>
                            Welcome to TrendVista, your ultimate destination for fashion-forward clothing, trendy accessories, and stylish essentials for the entire family. At TrendVista, we believe in offering quality products that not only elevate your style but also reflect the latest fashion trends.
                        </p>
                        <h4>
                            Our Mission
                        </h4>
                        <p>
                            Our mission at TrendVista is to empower individuals to express their unique style and confidence through our curated collection of apparel and accessories. We strive to provide exceptional customer service and deliver an unparalleled shopping experience to every customer.
                        </p>

                        <h4>
                            Our Products
                        </h4>
                        <p>
                            TrendVista offers a wide range of products to suit every fashion need:
                        </p>

                        <b>Clothing:</b> 
                        <p>
                            Explore our diverse collection of clothing, including tops, bottoms, dresses, and outerwear, designed to keep you stylish in every season.
                        </p>
                        <b>Accessories:</b>
                        <p>
                             Complete your look with our trendy accessories, including handbags, jewelry, scarves, and more.
                        </p>
                        <b>Kids Clothing:</b> 
                        <p>
                            Dress your little ones in style with our adorable and comfortable collection of kids' clothing.
                        </p>
                        <b>Watches:</b>
                        <p>
                            Stay on time and on trend with our selection of fashionable watches for men and women.
                        </p> 
                        
                        <h4>
                        Contact Us
                        </h4>
                        <p>Have a question or need assistance? We're here to help!</p>

                        <p><b>Phone:</b> For customer support, call us at 8700076317.</p>
                        <p><b>Email:</b> Send us an email at shubhamzxv@gmail.com and we'll get back to you promptly.</p>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ContactUs