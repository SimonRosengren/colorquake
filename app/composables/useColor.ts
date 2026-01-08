import { ref, reactive } from 'vue'
import { getColorScheme, type ColorScheme } from '~/utils/color'

export interface ColorStyle {
  'background-color': string
  'color': string
}

export function useColor() {
  const styleObj = reactive<ColorStyle>({
    'background-color': 'grey',
    'color': '#ffffff'
  })
  
  const col = ref('#aaa000')
  const selectedScheme = ref<ColorScheme>('triadic')
  const colors = ref<string[]>([])
  const originalColor = ref<string>('')
  
  const generateScheme = () => {
    try {
      const result = getColorScheme(col.value, selectedScheme.value)
      colors.value = result.colors
      originalColor.value = result.original
    } catch (error) {
      console.error('Error generating color scheme:', error)
    }
  }
  
  return {
    styleObj,
    col,
    selectedScheme,
    colors,
    originalColor,
    generateScheme
  }
}
