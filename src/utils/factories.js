export const toReservationPayload = (data) => ({
  userId: data.id,
  cpf: data.cpf,
  brand: data.brand,
  model: data.model,
  carPlate: data.plate,
  startDate: data.startDate,
  endDate: data.endDate,
  timestamp: Date.now(),
  totalValue: data.value
})
