import { AuthFormsComponent } from '@components/auth-forms';
import RadioGroupComponent from '@components/radio-group';
import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ui/dialog';
import { useState } from 'react';
import { StorageOptions, storageOptions } from './storage-options';

// const SharedFormSchema = z.object({
//   storage: z.nativeEnum(StorageOptions, {
//     required_error: 'Storage type is required',
//   }),
// });
// const FormSchema = z
//   .discriminatedUnion('storage', [
//     SharedFormSchema.extend({
//       storage: z.literal(StorageOptions.Default),
//       email: z
//         .string({
//           required_error: 'Email is required',
//         })
//         .email({
//           message: 'Invalid email',
//         })
//         .optional(),
//       password: z
//         .string({
//           required_error: 'Password is required',
//         })
//         .min(8, {
//           message: 'Password must be at least 8 characters long',
//         })
//         .optional(),
//       passwordConfirmation: z
//         .string({
//           required_error: 'Password confirmation is required',
//         })
//         .min(8)
//         .optional(),
//     }),
//     SharedFormSchema.extend({
//       storage: z.literal(StorageOptions.Private),
//       email: z.string().optional(),
//       password: z.string().optional(),
//       passwordConfirmation: z.string().optional(),
//     }),
//   ])
//   .superRefine(({ storage, password, passwordConfirmation }, ctx) => {
//     if (storage === StorageOptions.Default && password !== passwordConfirmation) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Passwords do not match',
//         path: ['passwordConfirmation'],
//       });
//     }
//   });
// const form = useForm<z.infer<typeof FormSchema>>({
//   defaultValues: {
//     storage: StorageOptions.Default,
//   },
//   resolver: zodResolver(FormSchema),
// });

export default function StartSetup() {
  const [storage, setStorage] = useState<StorageOptions>(StorageOptions.Default);
  const [openAuth, setOpenAuth] = useState(false);

  function onSubmit() {
    setOpenAuth(storage === StorageOptions.Default);
  }

  return (
    <>
      <Dialog onOpenChange={() => setStorage(StorageOptions.Default)}>
        <DialogTrigger asChild>
          <Button className='mt-20'>Get Started</Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Choose your storage type</DialogTitle>
            <DialogDescription>
              Once you choose your storage, you cannot change it later
              <br />
              Data migration is not supported <span className='italic font-bold'>yet</span>
            </DialogDescription>
          </DialogHeader>

          <RadioGroupComponent
            className='py-4'
            items={storageOptions}
            defaultValue={storage}
            onValueChange={(value) => setStorage(value as StorageOptions)}
          />

          {/* <Form {...form}>
          <form
            tabIndex={0}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form?.control}
              name='storage'
              render={({ field }) => (

              )}
            />

            {formData()?.storage === StorageOptions.Default && (
              <>
                <div className='grid gap-4 pt-4'>
                  <FormField
                    control={form?.control}
                    name='email'
                    render={({ field }) => (
                      <div className='text-end'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <FormLabel
                            htmlFor='email'
                            className='text-right'
                          >
                            Email
                          </FormLabel>
                          <Input
                            id='email'
                            className='col-span-3'
                            {...field}
                          />
                        </div>
                        <FormMessage className='mt-2 font-light text-xs italic' />
                      </div>
                    )}
                  />
                  <FormField
                    control={form?.control}
                    name='password'
                    render={({ field }) => (
                      <div className='text-end'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <FormLabel
                            htmlFor='password'
                            className='text-right'
                          >
                            Password
                          </FormLabel>
                          <Input
                            id='password'
                            className='col-span-3'
                            type='password'
                            {...field}
                          />
                        </div>
                        <FormMessage className='mt-2 font-light text-xs italic' />
                      </div>
                    )}
                  />
                  <FormField
                    control={form?.control}
                    name='passwordConfirmation'
                    render={({ field }) => (
                      <div className='text-end'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <FormLabel
                            htmlFor='passwordConfirmation'
                            className='text-right'
                          >
                            Password Confirmation
                          </FormLabel>
                          <Input
                            id='passwordConfirmation'
                            className='col-span-3'
                            type='password'
                            {...field}
                          />
                        </div>
                        <FormMessage className='mt-2 font-light text-xs italic' />
                      </div>
                    )}
                  />
                </div>
              </>
            )}
          </form>
        </Form> */}

          <Button
            className='w-full mt-8'
            onClick={onSubmit}
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openAuth}
        onOpenChange={() => setOpenAuth(false)}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogTitle hidden></DialogTitle>
          <AuthFormsComponent />
        </DialogContent>
      </Dialog>
    </>
  );
}
