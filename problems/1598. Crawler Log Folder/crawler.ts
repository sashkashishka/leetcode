function minOperations(logs: string[]): number {
  let deep = 0;


  for (let i = 0; i < logs.length; i++) {
    const operation = logs[i];

    switch (operation) {
      case '../': {
        deep = Math.max(0, deep - 1);
        break;
      }

      case './': {
        // noop
        break;
      }

      default: {
        deep += 1;
      }
    }
  }

  return deep;
};

export { minOperations }
