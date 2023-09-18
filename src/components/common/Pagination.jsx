import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ITEM_PER_PAGE } from '../../Constant'
import { useEffect } from 'react'
import { fetchProductsByFiltersAsync } from '../../redux/productSlice'
import { useDispatch } from 'react-redux'
import { fetchAllOrdersAsync } from '../../redux/orderSlice'

// const Pagination = ({ page, setPage, handlePage, totalItems }) => {
const Pagination = ({ page, setPage, totalItems }) => {

  const dispatch = useDispatch()
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(totalItems / ITEM_PER_PAGE)
    if (page < maxPage) {
      setPage(page + 1)
    }
  }

  
  const handlePage = (pageNumber) => {
    setPage(pageNumber)
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };

    dispatch(fetchProductsByFiltersAsync({ pagination }))
    dispatch(fetchAllOrdersAsync({ pagination }));
  }, [dispatch, page])

  // useEffect(() => {
  //   setPage(1)
  // }, [totalItems,setPage])



  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={handlePreviousPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={page === 1}
          >
            Previous
          </div>
          <button
            onClick={handleNextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={page * ITEM_PER_PAGE >= totalItems}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {(page - 1) * ITEM_PER_PAGE + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {page * ITEM_PER_PAGE > totalItems
                  ? totalItems
                  : page * ITEM_PER_PAGE}
              </span>{' '}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={handlePreviousPage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={page === 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* {Array.from({ length: Math.ceil(totalItems / ITEM_PER_PAGE) }).map(
                (el, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handlePage(index + 1)
                      {console.log("index + 1",index + 1)}
                    }}
                    aria-current="page"
                    className={`relative cursor-pointer z-10 inline-flex items-center ${index + 1 === page
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400'
                      } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index + 1}
                  </div>
                )
              )} */}
              {Array.from({ length: Math.ceil(totalItems / ITEM_PER_PAGE) }).map(
  (el, index) => (
    <div
      key={index}
      onClick={() => {
        const pageNumber = index + 1;
        handlePage(pageNumber); // Set the current page when clicked
        console.log("Clicked page number:", pageNumber);
      }}
      aria-current="page"
      className={`relative cursor-pointer z-10 inline-flex items-center ${
        index + 1 === page
          ? 'bg-indigo-600 text-white'
          : 'text-gray-400'
      } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {index + 1}
    </div>
  )
)}

              <button
                onClick={handleNextPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={page * ITEM_PER_PAGE >= totalItems}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pagination

