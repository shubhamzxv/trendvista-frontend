import React from 'react'
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <Layout title={"go back- page not found"}>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1>404</h1>
          <h2>Oops ! Page Not Found</h2>
          <Link to="/" className="btn btn-secondary">
            Go Back
          </Link>
        </div>
      </Layout>
    </div>
  )
}

export default PageNotFound