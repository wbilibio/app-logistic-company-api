import { validateClass } from '../functions';

export function ValidateParams(...classes: Array<new () => any>) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>,
  ): void {
    const method = descriptor.value as Function;

    descriptor.value = async function (...params: any[]) {
      await Promise.all(
        classes.map(async (paramClass, index) => {
          return await validateClass(params[index], paramClass);
        }),
      );

      return method.apply(this, params);
    };
  };
}
