import type {Ref} from '../../src/___OLD';
import {setCurrentInstance, useRef} from '../../src/___OLD';
import mockInstance from '../__mocks__/mock-instance';

describe('useRef', ((): void => {
  let currentInstance: any;

  beforeEach((): void => {
    currentInstance = mockInstance();

    setCurrentInstance(currentInstance);
  });

  afterEach((): void => {
    setCurrentInstance(undefined as any);
  });

  test('should not trigger re-render', ((): void => {
    expect(currentInstance.updateCount).toBe(0);

    const ref: Ref<number> = useRef(2);

    ref.current = 3;

    expect(currentInstance.updateCount).toBe(0);
  }));
}));
