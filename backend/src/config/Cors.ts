export const getCorsConfig = (env: string) => {
  if (env == 'localdev') {
    return {
      origin: '*',
    }
  }
}
