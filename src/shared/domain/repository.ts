export interface IRepository<T, U> {
  mapToDomain(entity: unknown): U;
  mapToInfra(entity: U): unknown;
}
