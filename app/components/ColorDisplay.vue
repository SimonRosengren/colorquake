<template>
  <div class="flex flex-col items-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-white text-lg font-semibold">Original Color</h3>
      <ColorSquare 
        :color="originalColor" 
        :show-hex="true" 
        @copy="handleCopy"
      />
    </div>
    
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-white text-lg font-semibold">Generated Colors</h3>
      <div class="flex gap-4">
        <ColorSquare
          v-for="color in colors"
          :key="color"
          :color="color"
          :show-hex="true"
          @copy="handleCopy"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  colors: string[]
  originalColor: string
}

interface Emits {
  copy: [color: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCopy = (color: string) => {
  emit('copy', color)
}
</script>