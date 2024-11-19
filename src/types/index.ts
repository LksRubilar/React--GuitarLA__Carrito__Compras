export type Guitar = {
  id: number
  name: string
  image: string
  description: string
  price: number

}

//hereda atributos de guitar y le suma quantity
export type CartItem = Guitar & { 
  quantity : number
}


//Se pueden heredar atributos de forma selectiva con:
/*
export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
  quantity: number
}
                                */

//nos permite tomar un dato y referenciarlo para poder cambiar
// export type GuitarID = Guitar['id']
//para el caso de este trabajo solo utilizamos Guitar['id'] para reemplazar los Ids