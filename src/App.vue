<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <!-- Logo SVG Icon -->
              <span
                class="text-2xl text-violet-700 font-bold text-primary-500"
              >E</span>
              <span class="text-2xl font-bold text-gray-800">-Shop</span>
            </router-link>
          </div>
          <div class="flex items-center">
            <router-link to="/cart" class="relative p-2">
              <button class="text-gray-800">
                <!-- Cart SVG Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m12-8l2 8M9 21a1 1 0 102 0 1 1 0 00-2 0zm6 0a1 1 0 102 0 1 1 0 00-2 0z"
                  />
                </svg>
              </button>
              <span
                v-if="cartItemCount"
                class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              >
                {{ cartItemCount }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="mx-auto max-w-7xl px-4 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>


<script>

import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const cartItemCount = computed(() => store.getters.cartItemCount)

    return {
      cartItemCount
    }
  }
}
</script>
