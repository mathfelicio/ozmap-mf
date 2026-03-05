export type FindCriteria<T> = Partial<Record<keyof T, unknown>>;

export interface FindOptions<T> {
  relations?: string[];
  order?: Partial<Record<keyof T, "ASC" | "DESC">>;
  skip?: number;
  take?: number;
  withDeleted?: boolean;
}
