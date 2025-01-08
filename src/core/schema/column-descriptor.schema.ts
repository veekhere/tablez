import { ColumnTypeEnum } from '@domain/enums/column-type.enum';

export type ColumnDescriptorSchema = {
  id: string;
  name: string;
  title: string;
  type: ColumnTypeEnum;
};
