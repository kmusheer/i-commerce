import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCartAsync, selectItem, updateCartAsync } from '../../redux/cartSlice';
import { discountedPrice } from '../../Constant';


const Cart = () => {
    // const [open, setOpen] = useState(true)

    const items = useSelector(selectItem)
    const dispatch = useDispatch()

    const totalAmount = items.reduce((amount, item) => discountedPrice(item) * item.quantity + amount, 0)
    const totalItems = items.reduce((total, item) => item.quantity + total, 0);


    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ ...item, quantity: +e.target.value }))
    }
    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }
    return (
        <>
            {!items.length && <Navigate to="/" replace={true} />}
            <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-8">
                    {/* <header className="bg-white shadow"> */}
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Shopping Cart
                        </h1>
                    </div>
                    <hr />
                    {/* </header> */}
                    <div className="flow-root">
                        <ul role="list" className=" divide-y divide-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={item.href}>{item.title}</a>
                                                </h3>
                                                <p className="ml-4">{discountedPrice(item)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className=" inset-y-0 left-0 flex items-center">
                                                <label htmlFor="Qty" className="">
                                                    Qty
                                                </label>
                                                <select
                                                    id="Qty"
                                                    name="Qty"
                                                    onChange={(e => handleQuantity(e, item))}
                                                    className="rounded-md border ml-2 border-gray-300 bg-transparent bg-none py-0 pl-4 pr-4 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    onClick={(e => handleRemove(e, item.id))}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* </div> */}

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total Item in cart</p>
                        <p>{totalItems}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or
                            <Link to="/">
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                                    // onClick={() => setOpen(false)}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart