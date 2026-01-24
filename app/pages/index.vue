<template>
  <div class="pt-12 pb-32 px-6 md:px-12 md:py-0 min-h-screen flex flex-col items-center md:justify-center" :style="styleObj">
    <div class="space-y-4">
      <h1 class="text-7xl md:mb-6 md:text-8xl text-white md:text-center tracking-tight font-serif">Let's get colorful</h1>
      <div class="flex flex-col md:flex-row gap-4 md:gap-2">
        <input
          v-model="col"
          type="text"
          placeholder="what's your color?"
          class="h-12 md:w-2/5 bg-white text-black rounded-sm md:rounded-r-none focus:outline-none px-4 shadow-sm"
        >
        <select
          v-model="selectedScheme"
          class="px-4 py-3 md:py-none rounded-sm md:rounded-none md:w-1/5 bg-white text-black"
        >
          <option value="triadic">Triadic</option>
          <option value="analogous">Analogous</option>
          <option value="complementary">Complementary</option>
          <option value="split-complementary">Split Complementary</option>
          <option value="tetradic">Tetradic</option>
        </select>
        <Button
          class="md:w-2/5 md:rounded-l-none"
          @click="generateScheme"
        >
          Generate
          <IconsBrush class="w-4 h-4" />
        </Button>    

      </div>

    </div>
       <ColorDisplay 
        v-if="colors.length"
        class="w-full mt-8 xl:max-w-2/3"
        :colors="colors" 
        :original-color="originalColor"
        :scheme="selectedScheme"
        @copy="handleColorCopy"
      />   
    <!-- Copy feedback toast -->
    <div
      v-if="showCopyToast"
      class="fixed top-4 right-4 flex gap-1 items-center bg-snow text-black px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300"
      :class="showCopyToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
    >
      Copied <span class="uppercase">{{ copiedColor }}</span> to clipboard!
      <IconsCopy class="w-4 h-4" />
    </div>
    

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
