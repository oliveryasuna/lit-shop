import type {HookData} from '../../element';
import type Dependency from './dependency';

const shouldRun = ((data: HookData, dependencies?: Dependency[]): boolean => {
  const result: boolean = (
      !dependencies
      || !data.dependencies
      || data.dependencies.some((dependency: Dependency, index: number): boolean => (dependency !== dependencies[index]))
  );

  data.dependencies = (dependencies ?? null);

  return result;
});

export default shouldRun;
export {
  shouldRun
};
