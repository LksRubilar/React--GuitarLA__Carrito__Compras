import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

//1.-tomamos las acciones creadas en el Hook de useCart y las definimos
export type CartActions =
{ type: 'add-to-cart', payload: {item: Guitar} } |
{ type: 'remove-from-cart', payload: {id : Guitar['id']} } |
{ type: 'decrease-quantity',  payload: {id : Guitar['id']} } |
{ type: 'increase-quantity',  payload: {id : Guitar['id']} } |
{ type: 'clear-cart' }


//2.-tomamos los Types definidos en types (incluye todo su contenido) y se los asignamos al estado
export type CartState = {
  data: Guitar[]
  cart: CartItem[]
}

//Local Storage
const initialCart = () : CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};


//3.-inicializamos el estado segun el origen de los datos, la base de datos y un carrito vacio
export const initialState : CartState = {
  data: db,
  cart: initialCart()
}

//traemos las variables de useCart:
const MAX_ITEMS = 10;
const MIN_ITEMS = 1;


//4.-cart reducer
//definimos el estado, y lo conoectamos a su inicializacion.
//definimos la acciones a ejecutar
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {

  if(action.type === 'add-to-cart') {

    //5.-pegamos el codigo correspondiente a agregar carrito desde app.tsx
    //a los elementos con error le agregamos state o modificamos con los actions.payload
    const itemExists = state.cart.find((guitar) => guitar.id === action.payload.item.id);

    let updatedCart : CartItem[] = []
    if (itemExists) {
      updatedCart = state.cart.map(item => {
        if(item.quantity === action.payload.item.id) {
            if(item.quantity < MAX_ITEMS) {
              return {...item, quantity: item.quantity + 1}
            } else{
              return item
            }
          } else {
            return item
          }
        })

    } else {
      const newItem : CartItem = {...action.payload.item, quantity : 1}
      updatedCart = [...state.cart, newItem]
    }

    return {
      ...state,
      cart: updatedCart
    }
  }

  if(action.type === 'remove-from-cart') {
    const cart = state.cart.filter(item => item.id !== action.payload.id)
    return {
      ...state,
      cart
    }
  }

  if(action.type === 'increase-quantity') {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart
    }
  }

  if(action.type === 'decrease-quantity') {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart
    }
  }

  if(action.type === 'clear-cart') {
    return {
      ...state,
      cart: []
    }
  }

  return state

}