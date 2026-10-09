type ProductDataResponse<Key extends string, EntityKey extends string, T> = {
  [K in Key]?: {
    [EK in EntityKey]: T[]
  } & {
    total: number
  }
}

export type { ProductDataResponse }