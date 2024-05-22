export const resizeTextByLength = (str: string | undefined, length: number) => {
  return str ? str.length > length ? str.substring(0, length) + '...' : str : ''
}
