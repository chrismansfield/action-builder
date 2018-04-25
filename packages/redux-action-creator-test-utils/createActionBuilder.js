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

/**
 * Creates a test data builder for Redux actions
 * @param {string} type The type od the action
 * @param {(Object|string)} [payloadSpec] If given an object, this object will be the default payload of the action.
 * Additionally, the builder will be generated with 'with' and 'without' methods for each of the keys in the object.
 * The values of the object will be used as default values
 * If given a string, the builder will contain a with and without method for that name
 * (e.g. given the payloadSpec 'id', the builder will have 'withId' and 'withoutId' methods)
 * @param {*} [payloadDefaultValue] The default value of the payload.
 * This parameter is only available when supplying a string to payloadSpec
 */
export default function createActionBuilder(type, payloadSpec, payloadDefaultValue) {
  if (!payloadSpec) {
    return basicBuilder(type);
  }

  if (typeof (payloadSpec) === 'object') {
    return complexBuilder(type, payloadSpec);
  }
  return primitiveBuilder(type, payloadSpec, payloadDefaultValue);
}
