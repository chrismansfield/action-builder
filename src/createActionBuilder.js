import { Builder, AutoBuilder } from 'testier';

const basicBuilder = type =>
  class extends Builder {
    constructor() {
      super();

      this.type = type;
    }
  };

const primitiveBuilder = (type, payloadFriendlyName, payloadDefaultValue) =>
  class extends AutoBuilder {
    constructor() {
      super({
        [payloadFriendlyName]: payloadDefaultValue,
      });
    }

    build() {
      return {
        type,
        payload: super.build()[payloadFriendlyName],
      };
    }
  };

const complexBuilder = (type, payloadSpec) =>
  class extends AutoBuilder {
    constructor() {
      super(payloadSpec);
    }
    build() {
      return {
        type,
        payload: super.build(),
      };
    }
  };

export default function createActionBuilder(type, payloadSpec, payloadDefaultValue) {
  if (!payloadSpec) {
    return basicBuilder(type);
  }

  if (typeof (payloadSpec) === 'object') {
    return complexBuilder(type, payloadSpec);
  }
  return primitiveBuilder(type, payloadSpec, payloadDefaultValue);
}
