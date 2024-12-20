<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Products</h1>
      <div class="flex items-center gap-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="rounded-lg border p-2"
        />
        <select v-model="selectedCategory" class="rounded-lg border p-2">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
    </div>

    <div v-else-if="error" class="rounded-lg bg-red-100 p-4 text-red-700">
      {{ error }}
    </div>

    <div v-else class="" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '../components/productCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  setup() {
    const store = useStore()
    const searchQuery = ref('')
    const selectedCategory = ref('')

    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    const products = computed(() => store.state.products)

    const categories = computed(() => {
      const cats = new Set(products.value.map(p => p.category))
      return Array.from(cats)
    })

    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
        return matchesSearch && matchesCategory
      })
    })

    const addToCart = (product) => {
      store.commit('addToCart', product)
    }

    onMounted(() => {
      store.dispatch('fetchProducts')
    })

    return {
      searchQuery,
      selectedCategory,
      loading,
      error,
      categories,
      filteredProducts,
      addToCart
    }
  }
}
</script>