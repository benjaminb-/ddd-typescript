interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public isSameAs(valueObject: ValueObject<ValueObjectProps>): boolean {
    return JSON.stringify(valueObject.props) === JSON.stringify(this.props);
  }
}
