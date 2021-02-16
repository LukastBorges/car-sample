export const formatCurrency = (number, currency = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency }).format(number)
}
