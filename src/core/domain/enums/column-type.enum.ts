import { SelectOption } from '@domain/select-option';
import { BinaryIcon, CalendarDaysIcon, CaseSensitiveIcon, LucideIcon, PowerIcon } from 'lucide-react';

export enum ColumnTypeEnum {
  Text = 'string',
  Numeric = 'number',
  Date = 'date',
  OnOff = 'boolean',
}

type EnumData = {
  name: string;
  icon?: LucideIcon;
};

export class ColumnType {
  static readonly dictionary = new Map<ColumnTypeEnum, EnumData>([
    [ColumnTypeEnum.Text, { name: 'Plain text', icon: CaseSensitiveIcon }],
    [ColumnTypeEnum.Numeric, { name: 'Numbers and decimals', icon: BinaryIcon }],
    [ColumnTypeEnum.Date, { name: 'Date', icon: CalendarDaysIcon }],
    [ColumnTypeEnum.OnOff, { name: 'On/Off values', icon: PowerIcon }],
  ]);

  id: ColumnTypeEnum = null;

  name: string = null;

  icon: LucideIcon = null;

  constructor(entity: ColumnTypeEnum = null) {
    if (!entity) {
      return;
    }

    this.id = entity;
    this.name = ColumnType.dictionary.get(entity)?.name;
    this.icon = ColumnType.dictionary.get(entity)?.icon;
  }

  static selectOptions(): SelectOption<ColumnTypeEnum>[] {
    const result: SelectOption<ColumnTypeEnum>[] = [];

    for (const [key, data] of this.dictionary.entries()) {
      result.push(new SelectOption({
        label: data?.name,
        value: key,
        icon: data?.icon,
      }));
    }

    return result;
  }

  static toClientObject(obj: any): ColumnType {
    if (!obj) {
      return null;
    }
    return new ColumnType(obj);
  }
}
