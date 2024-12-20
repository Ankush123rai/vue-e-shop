<template>
  <div v-if="product" class="grid gap-8 md:grid-cols-2">
    <div>
      <img :src="product.thumbnail" :alt="product.title" class="w-full rounded-lg" />
    </div>
    <div>
      <h1 class="mb-4 text-3xl font-bold">{{ product.title }}</h1>
      <div class="mb-4 flex items-center">
        <div class="flex">
          <div v-for="i in Math.round(product.rating)" :key="i" class="text-yellow-400">⭐</div>
        </div>
        <span class="ml-2 text-gray-600">({{ product.rating }})</span>
      </div>
      <p class="mb-4 text-gray-600">{{ product.description }}</p>
      <p class="mb-6 text-3xl font-bold">${{ product.price }}</p>
      
      <div class="mb-6">
        <label class="mb-2 block">Quantity:</label>
        <input
          type="number"
          v-model="quantity"
          min="1"
          class="w-20 rounded border p-2"
        />
      </div>

      <button
        @click="addToCart"
        class="rounded bg-violet-700 px-6 py-3 text-white hover:bg-primary-700"
        :disabled="!product.stock"
      >
        {{ product.stock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>


    <div class="mt-12">
      <h2 class="mb-4 text-2xl font-semibold">Customer Reviews</h2>
      <div v-if="product.reviews.length">
        <div
          v-for="review in product.reviews"
          :key="review.reviewerEmail"
          class="mb-4 rounded border bg-gray-50 p-4"
        >
          <div class="mb-2 flex items-center">
            <span class="font-bold">{{ review.reviewerName }}</span>
            <span class="ml-2 text-sm text-gray-500">{{ formatDate(review.date) }}</span>
          </div>
          <p class="text-gray-700">{{ review.comment }}</p>
        </div>
      </div>
      <div v-else class="text-gray-500">No reviews available.</div>
    </div>
  </div>

  <div class="mt-12">
      <h2 class="mb-4 text-2xl font-semibold">Related Products</h2>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">    
      <ProductCard
        v-for="related in relatedProducts"
        :key="related.id"
        :product="related"
        @add-to-cart="addToCart"  
      />
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ProductCard from '../components/productCard.vue'

export default {
  components: {
    ProductCard
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const quantity = ref(1)

    const product = computed(() =>
      store.state.products.find((p) => p.id === parseInt(route.params.id))
    )

    const relatedProducts = computed(() => {
      if (product.value) {
        return store.state.products.filter(
          (p) =>
            p.id !== product.value.id &&
            (p.category === product.value.category || product.value.tags.some((tag) => p.tags.includes(tag)))
        )
      }
      return []
    })

    const addToCart = () => {
      if (product.value) {
        const item = { ...product.value, quantity: quantity.value }
        store.commit('addToCart', item)
      }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return {
      product,
      quantity,
      relatedProducts,
      addToCart,
      formatDate
    }
  }
}
</script>
