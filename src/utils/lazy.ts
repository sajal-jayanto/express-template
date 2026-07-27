const lazyLoadDbEntity = <T>(factory: () => T): (() => T) => {
  let value: T | undefined;
  let initialized = false;
  return () => {
    if (!initialized) {
      value = factory();
      initialized = true;
    }
    return value as T;
  };
};

export { lazyLoadDbEntity };
