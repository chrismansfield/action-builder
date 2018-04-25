import createActionBuilder from '../createActionBuilder';

describe('createActionBuilder', () => {
  describe('only type', () => {
    it('returns a constructor creating a type-only action builder', () => {
      const type = 'A_TYPE';

      const ActionBuilder = createActionBuilder(type);
      const actual = new ActionBuilder().build();

      expect(actual).toEqual({
        type,
      });
    });
  });

  describe('primitive value paylaod', () => {
    it('returns a constructor creating a named primitve value payload', () => {
      const type = 'A_TYPE';

      const ActionBuilder = createActionBuilder(type, 'entityId');
      const actual = new ActionBuilder()
        .withEntityId(15)
        .build();

      expect(actual).toEqual({
        type,
        payload: 15,
      });
    });

    it('returns a constructor creating a named primitve value payload with default value', () => {
      const type = 'A_TYPE';

      const ActionBuilder = createActionBuilder(type, 'entityId', 'default');
      const actual = new ActionBuilder()
        .build();

      expect(actual).toEqual({
        type,
        payload: 'default',
      });
    });
  });

  describe('object value paylaod', () => {
    it('returns a constructor creating a complex payload builder', () => {
      const type = 'A_TYPE';

      const ActionBuilder = createActionBuilder(type, {
        property1: 1,
        property2: '2',
      });
      const actual = new ActionBuilder()
        .withProperty1(15)
        .withProperty2('30')
        .build();

      expect(actual).toEqual({
        type,
        payload: {
          property1: 15,
          property2: '30',
        },
      });
    });
  });
});
