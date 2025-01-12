import { Columns } from '@components/column-config/columns';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { authGuard } from '@guards/auth.guard';
import { useAppSelector } from '@store/hooks';
import { getColumnDescriptors } from '@store/slices/column-descriptors.slice';
import { TriangleAlertIcon } from 'lucide-react';

type Props = {
  editMode?: boolean;
};

export function Home(props: Props) {
  authGuard();
  const descriptors = useAppSelector(getColumnDescriptors);

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-16'>{props?.editMode ? 'Edit' : 'Create'} table template</h1>

      <div className='mb-4'>
        <Label
          htmlFor='template-name'
          className='select-none'
        >
          Template name
        </Label>

        <div className='flex items-center gap-4'>
          <Input
            id='template-name'
            type='text'
            placeholder='Template name'
            minLength={1}
            maxLength={40}
            className='w-[340px]'
            // error={titleError}
            // disabled={props?.disabled || props?.columnEditorMode}
            // onChange={(e) => columnConfigService.setColumnName(e.target.value, descriptor, setTitleError)}
          />

          <p className='flex text-xs text-muted-foreground-extra select-none'>
            <TriangleAlertIcon className='w-4 h-4 mr-1' />
            This value cannot be changed later
          </p>
        </div>
      </div>

      <div className=''>
        <Label
          htmlFor='template-description'
          className='select-none'
        >
          Description
        </Label>

        <Textarea
          id='template-description'
          placeholder='Template description'
          minLength={1}
          maxLength={1000}
          className='w-[614px]'
          // error={titleError}
          // disabled={props?.disabled || props?.columnEditorMode}
          // onChange={(e) => columnConfigService.setColumnName(e.target.value, descriptor, setTitleError)}
        />
      </div>

      <h3 className='text-xl font-bold mt-8'>Columns</h3>

      <Columns descriptors={descriptors} />
      {/* <TablePreview
        className='w-full'
        descriptors={descriptors}
      /> */}
    </div>
  );
}
