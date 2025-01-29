import { IsIn, IsISO8601, IsOptional } from "class-validator"


const AVAILABLE_LANGUAGES = ["German", "English"] as const
export type AvailableLanguage = typeof AVAILABLE_LANGUAGES[number]

const AVAILABLE_RATINGS = ["Gold", "Silver", "Bronze"] as const
export type AvailableRating = typeof AVAILABLE_RATINGS[number]

const AVAILABLE_PRODUCTS = ["Heatpumps", "SolarPanels"] as const
export type AvailableProduct = typeof AVAILABLE_RATINGS[number]

export class QueryAvailableSlotsFiltersDTO {

  @IsISO8601({ strict: true })
  date: string

  @IsOptional()
  @IsIn(AVAILABLE_PRODUCTS, { each: true })
  products?: Array<AvailableProduct>

  @IsOptional()
  @IsIn(AVAILABLE_LANGUAGES)
  language?: AvailableLanguage

  @IsOptional()
  @IsIn(AVAILABLE_RATINGS)
  rating?: AvailableRating
}

export type QueryAvailableSlotsResultDTO = Array<{
  start_date: string,
  available_count: number
}>
