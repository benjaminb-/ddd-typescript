import { DomainEvent } from "./domain.event";
import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {
  private events: Array<DomainEvent> = [];

  protected addEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  public pullEvents(): Array<DomainEvent> {
    const events = this.events.slice();
    this.events = [];
    return events;
  }
}
