import AdminProductList from '../components/admin/AdminProductList'
import NavBar from '../components/common/navbar/NavBar'


const AdminHome = () => {
  return (
    <div>
      <NavBar>
        <AdminProductList />
      </NavBar>
    </div>
  )
}

export default AdminHome