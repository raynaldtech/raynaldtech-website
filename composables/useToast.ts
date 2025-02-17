export const useToast = () => {
    const toast = ref<{
      title: string
      message: string
      type: 'success' | 'error'
    } | null>(null)
  
    const showToast = (title: string, message: string, type: 'success' | 'error' = 'success') => {
      toast.value = { title, message, type }
    }
  
    return {
      toast,
      showToast
    }
  }