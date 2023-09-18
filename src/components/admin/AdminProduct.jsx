import { Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import { useEffect, useState } from 'react'
import { fetchProductsByFiltersAsync, selectTotalItems } from '../../redux/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { StarIcon } from '@heroicons/react/20/solid';
import { ITEM_PER_PAGE, discountedPrice } from '../../Constant'

const AdminProduct = () => {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  const totalItems = useSelector(selectTotalItems)

  // const handlePage = () => {
  //   setPage(page)
  // }

  // useEffect(() => {
  //   dispatch(fetchAllProductsAsync());
  // }, [dispatch])

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ pagination }));
  }, [dispatch, page]);


  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <Link to={`/product-detail/${product.id}`} >
                  <div className="group relative border-solid border-2 p-2 border-gray-200">
                    <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <div href={product.thumbnail}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </div>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="w-6 h-6 inline"></StarIcon>
                          <span className=" align-bottom">
                            {product.rating}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm block font-medium text-gray-900">
                          ${discountedPrice(product)}
                        </p>
                        <p className="text-sm block line-through font-medium text-gray-400">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    {product.deleted && (
                      <div>
                        <p className="text-sm text-red-400">product deleted</p>
                      </div>
                    )}
                    {product.stock <= 0 && (
                      <div>
                        <p className="text-sm text-red-400">out of stock</p>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="mt-5">
                  <Link
                    to={`/admin/product-form/edit/${product.id}`}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        // handlePage={handlePage}
        totalItems={totalItems}
      >
      </Pagination>
    </div>
  )
}

export default AdminProduct