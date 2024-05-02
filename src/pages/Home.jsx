import React from 'react'
import HomeCover from '../components/HomeCover';
import Slider from '../components/Slider';
import './Home.css'
import Layout from '../components/Layout';

const Home = () => {
  return (
    // main file which is home page
    <Layout title="TrendVista-Home">
      <HomeCover />
      <Slider />
    </Layout>
  )
}

export default Home