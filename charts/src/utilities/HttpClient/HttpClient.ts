import axios from 'axios'

const httpClient = axios.create()

export async function getDummyProducts() {
  const response = httpClient.get('https://dummyjson.com/products')
  return response
}
