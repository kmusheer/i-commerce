import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrder, fetchAllOrders, updateOrder } from '../utils/orderApi';


const initialState = {
    status: 'idle',
    orders : [],
    currentOrder : null,
    totalOrders: 0
}
let index;

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
)
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
)
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
)
  


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) =>{
      state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle",
          state.orders.push(action.payload);
          state.currentOrder = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle",
        index = state.orders.findIndex(order => order.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle",
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
  },
})

// Action creators are generated for each case reducer function
export const { increment } = orderSlice.actions

export const {resetOrder} = orderSlice.actions;
export const selectcurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;


export default orderSlice.reducer