<template>
    <div class="flex flex-col md:flex-row gap-2 items-center">
        <ColorSquare
          v-for="(color, index) in colors"
          :key="color"
          class="w-full"
          :color="color"
          :show-hex="true"
          :usage-label="getUsageLabel(index)"
          :usage-description="getUsageDescription(index)"
          @copy="handleCopy"
        />
    </div>
</template>

<script setup lang="ts">
interface Props {
  colors: string[]
  originalColor: string
  scheme: string
}

interface Emits {
  copy: [color: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCopy = (color: string) => {
  emit('copy', color)
}

const getUsageLabel = (index: number): string => {
  switch (props.scheme) {
    case 'complementary':
      return index === 0 ? 'Primary' : 'Secondary'
    case 'triadic':
      return index === 0 ? 'Primary' : index === 1 ? 'Secondary' : 'Accent'
    case 'analogous':
      return index === 0 ? 'Base' : `Related ${index}`
    case 'split-complementary':
      return index === 0 ? 'Primary' : index === 1 ? 'Secondary' : 'Accent'
    case 'tetradic':
      return index === 0 ? 'Primary' : index === 1 ? 'Secondary' : `Accent ${index}`
    default:
      return index === 0 ? 'Primary' : `Color ${index + 1}`
  }
}

const getUsageDescription = (index: number): string => {
  switch (props.scheme) {
    case 'complementary':
      return index === 0 
        ? 'Main color for branding and key interface elements'
        : 'Accent color for highlights and call-to-action buttons'
    
    case 'triadic':
      return index === 0 
        ? 'Main brand color for headers and important elements'
        : index === 1 
          ? 'Supporting color for secondary content areas'
          : 'Highlight color for CTAs and interactive elements'
    
    case 'analogous':
      return index === 0 
        ? 'Foundation color for main content and backgrounds'
        : index === 1 
          ? 'Harmonious accent for navigation and menus'
          : 'Subtle highlight for hover states and details'
    
    case 'split-complementary':
      return index === 0 
        ? 'Main color for branding and dominant elements'
        : index === 1 
          ? 'Gentle accent for secondary content areas'
          : 'Vibrant highlight for important interactions'
    
    case 'tetradic':
      return index === 0 
        ? 'Main brand color for headers and key elements'
        : index === 1 
          ? 'Supporting color for content and backgrounds'
          : index === 2 
            ? 'First highlight for buttons and interactive elements'
            : 'Secondary highlight for notifications and alerts'
    
    default:
      return index === 0 
        ? 'Primary color for main elements and branding'
        : `Secondary color for accents and highlights`
  }
}
</script>
