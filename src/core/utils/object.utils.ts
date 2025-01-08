export class ObjectUtils {
  static constructorFiller(objClass: any, obj: any): void {
    Object.entries(obj)
      .filter(([key, _]) => Object.prototype.hasOwnProperty.call(objClass, key))
      .forEach(([key, value]) => objClass[key] = value);
  }
}
