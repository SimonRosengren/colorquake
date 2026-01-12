<template>
    <div class="flex flex-col md:flex-row items-center">
        <ColorSquare
          v-for="color in colors"
          :key="color"
          class="w-full"
          :color="color"
          :show-hex="true"
          @copy="handleCopy"
        />
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
