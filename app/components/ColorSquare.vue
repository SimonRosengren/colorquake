<template>
  <div
    class="relative aspect-video md:aspect-[3/4] group rounded-md cursor-pointer transform transition-all duration-200 hover:scale-105 hover:z-10 active:scale-95"
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
      class="absolute inset-0 flex flex-col justify-between p-2"
      :style="{
        'color': textColor
      }"
    >
      <div class="w-full">
        <!-- Usage info above divider -->
        <div v-if="usageLabel || usageDescription" class="mb-2">
          <div v-if="usageLabel" class="text-5xl font-serif mb-2">{{ usageLabel }}</div>
          <div v-if="usageDescription" class="text-sm leading-tight">{{ usageDescription }}</div>
        </div>
      </div>
      <div class="w-full">
        <div 
          class="h-px w-full mb-1"
          :style="{
            'background-color': textColor === 'white' ? '#F1F1F1' : '#171719',
            'color': textColor === 'white' ? '#F1F1F1' : '#171719'
          }"
        />
        <span class="font-mono text-sm uppercase select-none">
         {{ hexCode }}
        </span>
      </div>
    </div>
    
    <!-- Hover hint -->
    <div class="absolute top-1 right-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
      <div
        class="w-4 h-4 rounded-full flex items-center justify-center text-xs"
        :style="{
          'color': textColor === 'white' ? '#F1F1F1' : '#171719'
        }"
      >
        <IconsCopy class="w-5 h-5" />
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
  usageLabel?: string
  usageDescription?: string
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
