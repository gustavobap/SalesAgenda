export interface QueryAvailableSlotsFiltersDTO {
  date: Date,
  products?: Array<"Heatpumps" | "SolarPanels">,
  language?: "German" | "English",
  rating?: "Gold" | "Silver" | "Bronze"
}

export type QueryAvailableSlotsResultDTO = Array<{
  start_date: string,
  available_count: number
}>
