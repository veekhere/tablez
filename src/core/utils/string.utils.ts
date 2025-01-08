export class StringUtils {
  static toPascalCase(value: string): string {
    return value?.replace(/(^\w|-\w)/g, this.clearAndUpper);
  }

  static toCamelCase(value: string): string {
    return value
      ?.match(/[A-Z]{2,}(?=[0-9]+|[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/gi)
      ?.map((x) => x.toLowerCase())
      ?.map((x, index) => {
        if (index === 0) {
          return x;
        }
        return x.charAt(0).toUpperCase() + x.slice(1);
      })
      ?.join('') ?? null;
  }

  private static clearAndUpper(value: string): string {
    return value?.replace(/-/, "").toUpperCase();
  }
}