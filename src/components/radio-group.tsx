import { RadioItem } from '@domain/radio-item.model';
import { Form, FormControl, FormItem, FormLabel } from '@ui/form';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip';
import { useForm } from 'react-hook-form';

type Props = {
  items: RadioItem[];
  isForm?: boolean;
} & React.ComponentProps<typeof RadioGroup>;

export default function RadioGroupComponent(props: Props) {
  const form = useForm();
  return (
    <>
      {props?.isForm ? (
        component(props)
      ) : (
        <Form {...form}>
          <form>{component(props)}</form>
        </Form>
      )}
    </>
  );
}

function component(props: Props) {
  return (
    <RadioGroup
      className={props?.className}
      onValueChange={props?.onValueChange}
      defaultValue={props?.defaultValue ?? props?.items?.[0]?.value}
    >
      {props?.items?.map((item) => (
        <TooltipProvider key={item?.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <FormItem className={'flex space-x-3 mb-2 last:mb-0 ' + (item?.disabled ? 'cursor-not-allowed' : '')}>
                <FormControl>
                  <RadioGroupItem
                    id={item?.id}
                    value={item?.value}
                    disabled={item?.disabled}
                  />
                </FormControl>
                <FormLabel
                  htmlFor={item?.id}
                  className={'flex flex-col w-full ' + (item?.disabled ? 'text-muted-foreground cursor-not-allowed' : '')}
                >
                  {item?.label}
                  {item?.description && (
                    <span className={'mt-1 text-xs ' + (item?.disabled ? 'text-muted' : 'text-muted-foreground-extra')}>
                      {item?.description}
                    </span>
                  )}
                </FormLabel>
              </FormItem>
            </TooltipTrigger>

            {item?.disabled && item?.disabledDescription && (
              <TooltipContent
                align='start'
                side='bottom'
              >
                <p>{item?.disabledDescription}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </RadioGroup>
  );
}
