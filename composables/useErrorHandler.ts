export function useErrorHandler(error: Ref<Error | null>) {
  const toast = useToast()

  watch(error, (newError) => {
    if (!newError) {
      return
    }

    toast.add({
      title: 'Ошибка',
      color: 'error',
      description: newError?.message,
    })
  })
}
