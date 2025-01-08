import { ColumnDescriptor } from '@domain/column-descriptor.model';
import { ColumnTypeEnum } from '@domain/enums/column-type.enum';
import { format } from 'date-fns';
import { random } from 'lodash';
import { loremIpsum } from 'lorem-ipsum';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '@/lib/utils';

type TableHeader = {
  id: string;
  title: string;
  className?: string;
};

type TableRow = {
  id: string;
  value: any;
  className?: string;
};

type Props = {
  className?: string;
  descriptors: ColumnDescriptor[];
};

export function TablePreview(props: Props) {
  function getHeaderCells(): TableHeader[] {
    return props?.descriptors?.map((descriptor) => {
      return {
        id: descriptor?.id,
        title: descriptor?.title,
        className: getHeaderCellClass(descriptor?.type?.id),
      };
    });
  }

  function getRowCells(): TableRow[] {
    return props?.descriptors?.map((descriptor) => {
      return {
        id: uuidv4(),
        value: formatValue(getValueExample(descriptor?.type?.id)),
        className: getClass(descriptor?.type?.id),
      };
    });
  }

  function formatValue(value: string | number | Date | boolean): any {
    if (value instanceof Date) {
      return format(value, 'PPP');
    }
    return value;
  }

  function getHeaderCellClass(columnType: ColumnTypeEnum): string {
    switch (columnType) {
      case ColumnTypeEnum.Numeric:
        return 'text-right';

      case ColumnTypeEnum.OnOff:
        return 'text-center';

      default:
        return '';
    }
  }

  function getValueExample(columnType: ColumnTypeEnum): any {
    switch (columnType) {
      case ColumnTypeEnum.Text:
        return loremIpsum({ count: random(3, 5), units: 'words' });

      case ColumnTypeEnum.Numeric:
        return random(100, 1000, true);

      case ColumnTypeEnum.Date:
        return new Date(random(946674000000, Date.now()));

      case ColumnTypeEnum.OnOff:
        return Boolean(random(0, 1));
    }
  }

  function getClass(columnType: ColumnTypeEnum): string {
    switch (columnType) {
      case ColumnTypeEnum.Text:
        return 'font-flow';

      case ColumnTypeEnum.Numeric:
        return 'text-right';

      default:
        return '';
    }
  }

  function getValue(value: any): any {
    if (typeof value === 'boolean') {
      return (
        <div className='w-full h-full flex items-center justify-center'>
          <Checkbox checked={value} />
        </div>
      );
    }
    return value;
  }

  return (
    <div
      className={cn('border-2 rounded-xl overflow-hidden h-40', props?.className)}
      style={{
        maskImage: 'linear-gradient(to bottom, black, transparent 90%)',
      }}
    >
      <Table className='select-none pointer-events-none'>
        <TableHeader>
          <TableRow>
            {getHeaderCells()?.map((cell) => (
              <TableHead
                key={cell.id}
                className={cell?.className}
              >
                {cell?.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='opacity-30'>
          <TableRow>
            {getRowCells()?.map((cell) => (
              <TableCell
                key={cell?.id}
                className={cell?.className}
              >
                {getValue(cell?.value)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {getRowCells()?.map((cell) => (
              <TableCell
                key={cell?.id}
                className={cell?.className}
              >
                {getValue(cell?.value)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
