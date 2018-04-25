/* global test, expect */

const getTestName = (actionCreatorName, type, args, isExpectingPayload, additionalProps) => {
  let name = `that ${actionCreatorName}`;
  if (args) {
    name += `, given arguments ${JSON.stringify(args)},`;
  }
  name += ` returns an action with type ${type}`;
  if (isExpectingPayload) {
    name += ' and containing a payload';
  }

  const additionalKeys = Object.keys(additionalProps);
  if (additionalKeys.length > 0) {
    name += ` as well as keys "${additionalKeys.join('", "')}"`;
  }
  return name;
};

/**
 * Encapsulates an expectation for a Redux action creator
 */
class ActionCreatorExpectation {
  constructor(actionCreator) {
    this.actionCreator = actionCreator;
  }

  /**
   * Configure the expectation to call the action creator with the supplied arguments
   * @param {...*} args A list of arguments to be used when invoking the action creator
   * @returns {ActionCreatorExpectation} The current ActionCreatorExpectation for chaining
   */
  withArgs(...args) {
    this.args = args;
    return this;
  }

  /**
   * Emits the expectation to Jest
   * @param {string} type The expected type of the created action
   * @param {*} [payload] The expected payload of the created action.
   * If left empty, no payload is expected
   * @param {Object} [additionalProps={}] Any additional properties except type and payload
   * expected on the created action
   */
  toCreateAction(type, payload, additionalProps = {}) {
    const { actionCreator, args } = this;
    const expectation = {
      ...additionalProps,
      type,
      payload,
    };

    test(getTestName(actionCreator.name, type, args, !!payload, additionalProps), () => {
      const actual = args ? actionCreator(...args) : actionCreator();

      expect(actual).toEqual(expectation);
    });
  }
}

/**
 * Create a configurable expectation of a Redux action creator.
 * @param {Function} actionCreator The action creator to apply the expectation to
 * @returns {ActionCreatorExpectation} The configurable expectation
 * @example
 * // Expects an action with only a type
 * expectActionCreator(myAction).toCreateAction("MY_ACTION")
 * @example
 * // Expects an action with a payload supplied directly to the action creator
 * expectActionCreator(myAction)
 *   .withArgs({ some: 'value' })
 *   .toCreateAction("MY_ACTION", { some: 'value' })
 * @example
 * // Expects an action with a payload supplied with multiple arguments
 * expectActionCreator(myAction)
 *   .withArgs('value1', 'value2')
 *   .toCreateAction("MY_ACTION", { key1: 'value1', key2: 'value2' })
 * @example
 * // Expects an action with more properties than just type and payload.
 * // In this case, expectation is setup to expect
 * // {
 * //   type: 'MY_ACTION',
 * //   payload: { key1: 'value1' },
 * //   somethingElse: 'value2',
 * // }
 * expectActionCreator(myAction)
 *   .withArgs('value1', 'value2')
 *   .toCreateAction("MY_ACTION", { key1: 'value1' }, { somethingElse: 'value2' })
 */
export default actionCreator => new ActionCreatorExpectation(actionCreator);
