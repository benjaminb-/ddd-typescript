export abstract class DomainEvent {}
export abstract class DomainEventHandler {
  protected abstract name: string;
  public abstract handle(...args: any): Promise<void>;
}
