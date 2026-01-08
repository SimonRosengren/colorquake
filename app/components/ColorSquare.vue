<template>
  <div
    class="relative h-24 w-32 rounded-lg cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95"
    :style="{ 'background-color': color }"
    @click="copyColor"
  >
    <!-- Copy feedback pulse -->
    <div
      v-if="showCopyFeedback"
      class="absolute inset-0 rounded-lg bg-white opacity-30 animate-pulse"
    />
    
    <!-- Hex code overlay -->
    <div
      v-if="showHex"
      class="absolute inset-0 flex items-center justify-center rounded-lg"
      :style="{
        'background-color': textColor === 'white' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        'color': textColor
      }"
    >
      <span class="font-mono text-sm font-semibold select-none">
        {{ hexCode }}
      </span>
    </div>
    
    <!-- Hover hint -->
    <div class="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
      <div
        class="w-4 h-4 rounded-full flex items-center justify-center text-xs"
        :style="{
          'background-color': textColor === 'white' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          'color': textColor
        }"
      >
        📋
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { normalizeToHex, getContrastTextColor } from '~/utils/color'

interface Props {
  color: string
  showHex?: boolean
}

interface Emits {
  copy: [color: string]
}

const props = withDefaults(defineProps<Props>(), {
  showHex: true
})

const emit = defineEmits<Emits>()

const showCopyFeedback = ref(false)

const hexCode = computed(() => normalizeToHex(props.color))

const textColor = computed(() => getContrastTextColor(props.color))

const copyColor = async () => {
  try {
    await navigator.clipboard.writeText(hexCode.value)
    
    // Show visual feedback
    showCopyFeedback.value = true
    emit('copy', hexCode.value)
    
    // Hide feedback after animation
    setTimeout(() => {
      showCopyFeedback.value = false
    }, 300)
  } catch (error) {
    console.error('Failed to copy color:', error)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = hexCode.value
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      showCopyFeedback.value = true
      emit('copy', hexCode.value)
      setTimeout(() => {
        showCopyFeedback.value = false
      }, 300)
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError)
    }
    document.body.removeChild(textArea)
  }
}
</script>