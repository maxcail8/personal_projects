import { createApp } from 'vue'
import './style/index.css'
import App from './vue/App.vue'
import { ProductService } from './application/Product/ProductService'

const app = createApp(App)

// Services
const productService = new ProductService()

app.provide<ProductService>('productService', productService)

// Mount dell'app
app.mount('#app')
