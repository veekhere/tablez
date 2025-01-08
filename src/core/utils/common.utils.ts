
export class CommonUtils {
  static exhaustiveCheck(target: never, klassName: string = null): never {
    const name = klassName ? klassName + ':' : '';
    throw new Error(`${name} Missing implementation for case: ${target}`.trim());
  }
}
