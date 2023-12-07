export const logger = (target: any, key: any, descriptor: PropertyDescriptor) => {
  var originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const functionName = key;
    console.log(functionName + "(" + args.join(", ") + ")");
    const result = originalMethod.apply(this, args);
    console.log("=> " + result);
    return result;
  };

  return descriptor;
};
