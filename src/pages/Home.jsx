import Footer from '../components/common/footer/Footer'
import NavBar from '../components/common/navbar/NavBar'
import ProductList from '../components/productList/ProductList'

const Home = () => {
    return (
        <div>
            <NavBar >
                <ProductList />
            </NavBar>
            <Footer />
        </div>
    )
}

export default Home