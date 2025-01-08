import { ColumnDescriptor } from '@domain/column-descriptor.model';

export class Validation {
  private static readonly validChars = /^[a-z0-9_ ]+$/gi;

  static isValidColumnTitle(value: string): string {
    if (!this.validChars.test(value)) {
      return [
        ...new Set(
          value?.replace(/[a-z0-9_ ]+/gi, '')
            ?.split('')
        )
      ]
        .join(' ');
    }
    return null;
  }

  static isColumnTitleUnique(descriptor: ColumnDescriptor, descriptors: ColumnDescriptor[]): boolean {
    return !descriptors.some((d) => d.title === descriptor?.title && d.id !== descriptor?.id);
  }
}
