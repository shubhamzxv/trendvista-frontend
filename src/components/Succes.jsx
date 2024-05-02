import axios from 'axios';
import React, { useEffect } from 'react'
import { useCart } from '../Context/CartContext';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Succes = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer);
  const [cart, setCart] = useCart();
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePyament = async () => {
    const total = totalPrice();
    const id = user.user._id;

    try {
      if (total) {

        const data = await axios.post(`${process.env.REACT_APP_API}/api/product/success-payment`, {cart, id })

        localStorage.removeItem("cart");
        setCart([]);
        navigate("/");
        toast.success("Payment Completed Successfully ");
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    handlePyament();
  }, [cart]);

  return (
    <div>
      Payment Successfully
    </div>
  )
}

export default Succes