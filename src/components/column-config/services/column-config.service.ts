import { ColumnDescriptor } from '@domain/column-descriptor.model';
import { ColumnType, ColumnTypeEnum } from '@domain/enums/column-type.enum';
import { addColumnDescriptor, clearColumnDescriptors, deleteColumnDescriptors, setColumnDescriptors, updateColumnDescriptor } from '@store/slices/column-descriptors.slice';
import { StringUtils } from '@utils/string.utils';
import { Validation } from '@utils/validation.utils';
import { cloneDeep } from 'lodash';

export class ColumnConfigService {

  constructor(
    private readonly dispatch: (action: any) => void,
    private readonly descriptors: ColumnDescriptor[] = null,
  ) {}

  moveDescriptor(descriptorId: string, sourceIndex: number, destinationIndex: number): void {
    const descriptors = cloneDeep(this.descriptors);
    const descriptor = descriptors.find((d) => d.id === descriptorId);

    descriptors.splice(sourceIndex, 1);
    descriptors.splice(destinationIndex, 0, descriptor);

    this.dispatch(setColumnDescriptors(descriptors));
  }

  addDescriptor(): void {
    const descriptor = ColumnDescriptor.toClientObject({
      name: 'columnName',
      title: 'Column title',
      type: ColumnTypeEnum.Text,
    });

    this.dispatch(addColumnDescriptor(descriptor));
  }

  setColumnName(value: string, descriptor: ColumnDescriptor, setTitleError: (error: string) => void): void {
    const title = value?.trim();
    const updatedDescriptor = new ColumnDescriptor({
      ...descriptor,
      name: StringUtils.toCamelCase(title),
      title,
    });

    const invalidChars = Validation.isValidColumnTitle(title);
    const unique = Validation.isColumnTitleUnique(updatedDescriptor, this.descriptors);

    if (!title || title.length === 0) {
      setTitleError('Column title is required');
      updatedDescriptor.error = true;
    } else if (invalidChars) {
      setTitleError(`Column title contains invalid characters: ${invalidChars}`);
      updatedDescriptor.error = true;
    } else if (!unique) {
      setTitleError('Column title must be unique');
      updatedDescriptor.error = true;
    } else {
      setTitleError(null);
    }

    this.dispatch(updateColumnDescriptor(updatedDescriptor));
  }

  setColumnType(value: ColumnTypeEnum, descriptor: ColumnDescriptor): void {
    const type = ColumnType.toClientObject(value);
    const updatedDescriptor = new ColumnDescriptor({
      ...descriptor,
      type,
    });

    this.dispatch(updateColumnDescriptor(updatedDescriptor));
  }

  deleteDescriptors(descriptorIds: string[]): void {
    this.dispatch(deleteColumnDescriptors(descriptorIds));
  }

  clearDescriptors(): void {
    this.dispatch(clearColumnDescriptors());
  }
}
