import expectActionCreator from '../expectActionCreator';

describe('expectActionCreator', () => {
  describe('basic action creator', () => {
    const BASIC_ACTION = 'BASIC_ACTION';
    const basicActionCreator = () => ({ type: BASIC_ACTION });

    expectActionCreator(basicActionCreator).toCreateAction(BASIC_ACTION);
  });

  describe('with basic payload', () => {
    const WITH_BASIC_PAYLOAD = 'WITH_BASIC_PAYLOAD';
    const withBasicPayload = payload => ({ type: WITH_BASIC_PAYLOAD, payload });

    expectActionCreator(withBasicPayload)
      .withArgs({ stuff: 'yup' })
      .toCreateAction(WITH_BASIC_PAYLOAD, { stuff: 'yup' });
  });

  describe('with complicated payload', () => {
    const WITH_COMPILED_PAYLOAD = 'WITH_COMPILED_PAYLOAD';
    const withCompiledPayload = (prop1, prop2) => ({
      type: WITH_COMPILED_PAYLOAD,
      payload: { prop1, prop2 },
    });

    expectActionCreator(withCompiledPayload)
      .withArgs('this is', 'SPARTA!')
      .toCreateAction(WITH_COMPILED_PAYLOAD, { prop1: 'this is', prop2: 'SPARTA!' });
  });

  describe('with way too complicated action', () => {
    const COMPLICATED_ACTION = 'COMPLICATED_ACTION';
    const complicatedAction = (prop1, prop2) => ({
      type: COMPLICATED_ACTION,
      payload: { prop1 },
      something: { else: [prop2] },
    });

    expectActionCreator(complicatedAction)
      .withArgs('this makes sense', 'this does not.')
      .toCreateAction(COMPLICATED_ACTION, { prop1: 'this makes sense' }, {
        something: { else: ['this does not.'] },
      });
  });
});
