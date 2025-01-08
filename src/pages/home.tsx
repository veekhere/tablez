import { Columns } from '@components/column-config/columns';
import { TablePreview } from '@components/table-preview';
import { authGuard } from '@guards/auth.guard';
import { useAppSelector } from '@store/hooks';
import { getColumnDescriptors } from '@store/slices/column-descriptors.slice';

export function Home() {
  authGuard();
  const descriptors = useAppSelector(getColumnDescriptors);

  return (
    <div className='flex p-4'>
      <Columns descriptors={descriptors} />
      <TablePreview
        className='w-full'
        descriptors={descriptors}
      />
    </div>
  );
}
