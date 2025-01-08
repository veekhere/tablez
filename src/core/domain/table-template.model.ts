import { ObjectUtils } from '@utils/object.utils';
import { BaseModel } from './base.model';
import { ColumnDescriptor } from './column-descriptor.model';

export class TableTemplate extends BaseModel {

  name: string = null;

  description: string = null;

  structure: Record<string, ColumnDescriptor> = null;

  constructor(entity: Partial<TableTemplate> = null) {
    super(entity);
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.structureFiller(entity.structure);
  }

  private structureFiller(structure: Record<string, ColumnDescriptor>): void {
    if (!structure) {
      return null;
    }
    Object.entries(structure)
      .forEach(([key, value]) => this.structure[key] = new ColumnDescriptor(value));
  }
}
