export abstract class DomainEvent {
  public abstract handle(): void;
}
