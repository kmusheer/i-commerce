import React from 'react'
import ProductDetail from '../components/productList/productDetail/ProductDetails'
import NavBar from '../components/common/navbar/NavBar'

const ProductDetailPage = () => {
  return (
    <div>
        <NavBar>
        <ProductDetail />
        </NavBar>
            
    </div>
  )
}

export default ProductDetailPage