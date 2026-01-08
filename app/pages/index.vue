<template>
  <div class="min-h-screen flex flex-col items-center justify-center" :style="styleObj">
    <div class="space-y-4">
      <h1 class="font-bold uppercase text-8xl text-white">Color Schemes</h1>
      
      <input
        v-model="col"
        type="text"
        placeholder="what's your color?"
        class="h-12 bg-white text-black w-full rounded-lg focus:outline-none px-4 shadow-sm"
      >
      
      <select
        v-model="selectedScheme"
        class="px-4 py-2 rounded-md bg-white text-black"
      >
        <option value="triadic">Triadic</option>
        <option value="analogous">Analogous</option>
        <option value="complementary">Complementary</option>
        <option value="split-complementary">Split Complementary</option>
        <option value="tetradic">Tetradic</option>
      </select>
      
      <button
        class="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-100"
        @click="generateScheme"
      >
        Generate Scheme
      </button>
    </div>
    
    <!-- Copy feedback toast -->
    <div
      v-if="showCopyToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300"
      :class="showCopyToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
    >
      Copied {{ copiedColor }} to clipboard!
    </div>
    
    <ColorDisplay 
      v-if="colors.length"
      :colors="colors" 
      :original-color="originalColor" 
      @copy="handleColorCopy"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { styleObj, col, selectedScheme, colors, originalColor, generateScheme } = useColor()

const showCopyToast = ref(false)
const copiedColor = ref('')

const handleColorCopy = (color: string) => {
  copiedColor.value = color
  showCopyToast.value = true
  
  // Hide toast after 2 seconds
  setTimeout(() => {
    showCopyToast.value = false
  }, 2000)
}
</script>
