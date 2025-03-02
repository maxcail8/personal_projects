<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { ProductProperties } from '../../domain/Product/Product'
import { ProductService } from '../../application/Product/ProductService'
import ProductRating from '../components/Product/ProductRating.vue'

// Injections
const productService = inject<ProductService>('productService')!

// Reactive
const pageLoading = ref<boolean>(true)
const productList = ref<ProductProperties[]>([])

const filterTitleDescription = ref<string>('')
const filterCategory = ref<string>('')
const filterPriceMin = ref<string>('')
const filterPriceMax = ref<string>('')

// Computed
const productShowed = computed<ProductProperties[]>(() =>
  productList.value.filter((product) => {
    return (
      (filterTitleDescription.value === '' ||
        product.title
          .toLowerCase()
          .includes(filterTitleDescription.value.toLowerCase())) &&
      (filterCategory.value === '' ||
        product.category
          .toLowerCase()
          .includes(filterCategory.value.toLowerCase()))
    )
  })
)

onMounted(async () => {
  await productService.getProducts().then((products) => {
    productList.value = products
    pageLoading.value = false
  })
})
</script>

<template>
  <div class="m-4">
    <h1 class="mb-4 text-2xl font-bold">Products</h1>
    <div class="grid grid-cols-12 gap-7">
      <div class="col-span-4">
        <label class="block">Title or description</label>
        <input
          type="text"
          class="p-0.5 border border-neutral-300 w-full rounded-md"
          v-model="filterTitleDescription"
        />
      </div>
      <div class="col-span-4">
        <label class="block">Category</label>
        <input
          type="text"
          class="p-0.5 border border-neutral-300 w-full rounded-md"
          v-model="filterCategory"
        />
      </div>
      <div class="col-span-4">
        <label class="block">Price</label>
        <div class="flex w-full gap-5">
          <input
            type="number"
            class="p-0.5 border border-neutral-300 w-full rounded-md"
          /><input
            type="number"
            class="p-0.5 border border-neutral-300 w-full rounded-md"
          />
        </div>
      </div>
    </div>
    <div
      v-for="product in productShowed"
      :key="product.id"
      class="my-4 p-5 border border-neutral-300 bg-neutral-100 rounded-md grid grid-cols-12 gap-10 items-center"
    >
      <div class="col-span-2 flex justify-center">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="rounded-full h-[150px]"
        />
      </div>
      <div class="col-span-6">
        <div class="mb-2 text-lg font-bold">{{ product.title }}</div>
        <div class="text-md">{{ product.description }}</div>
      </div>
      <div class="col-span-2">
        <div class="mb-2 text-lg font-bold">
          Category: {{ product.category }}
        </div>
        <div class="text-md">Price: {{ product.price }} €</div>
      </div>
      <ProductRating :rating="product.rating" />
    </div>
  </div>
</template>
