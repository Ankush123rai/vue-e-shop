<template>
  <div class="rounded-lg border bg-white p-4 shadow-sm">
    <img :src="product.thumbnail" :alt="product.title" class="mb-4 h-48 w-full object-cover rounded" />
    <h3 class="mb-2 text-lg font-semibold text-gray-800">{{ product.title }}</h3>
    <div class="mb-2 flex items-center">
      <div class="flex">
        <div v-for="i in Math.round(product.rating)" :key="i" class="text-yellow-500">⭐</div> 
      </div>
      <span class="ml-2 text-sm text-gray-500">({{ product.rating }})</span>
    </div>
    <p class="mb-4 text-xl font-bold text-gray-900">${{ product.price }}</p>
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'ProductDetail', params: { id: product.id } }"
        class="text-blue-600 hover:text-blue-700 font-medium"
      >
        View Details
      </router-link>
      <button
        @click="$emit('add-to-cart', product)"
        class="rounded bg-violet-700 px-4 py-2 text-white font-semibold hover:bg-violet-900"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { FiStar } from 'react-icons/fi'

export default {
  name: 'ProductCard',
  components: {
    FiStar
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>