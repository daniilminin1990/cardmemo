export const base64toFile = (base64String: null | string | undefined) => {
  let image = null as File | null | undefined

  if (base64String) {
    const contentType = 'image/png' // Замените на правильный тип содержимого
    const sliceSize = 512
    const byteCharacters = atob(base64String.split(',')[1])
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length)

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)

      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })

    image = new File([blob], 'filename.png', { type: contentType })
  }

  return image
}
