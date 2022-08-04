import { fetchUser, fetchCart } from "../Componets/utils/fecthLocalStorageData"

const userInfor = fetchUser()
const cartInfo  = fetchCart()


export const initialState = {
    user: userInfor,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo ,
}