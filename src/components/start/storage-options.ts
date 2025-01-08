import { RadioItem } from '@domain/radio-item.model';

export enum StorageOptions {
  Default = 'default',
  Private = 'private',
  Local = 'local',
}

export const storageOptions = [
  new RadioItem({
    value: StorageOptions.Default,
    label: 'Default',
    description: 'Login or create an account to store your data'
  }),
  new RadioItem({
    value: StorageOptions.Private,
    label: 'Private Cloud',
    description: 'Setup your own Cloud storage step by step',
    disabled: true,
    disabledDescription: 'In development for desktop version'
  }),
  new RadioItem({
    value: StorageOptions.Local,
    label: 'Local',
    description: 'Store your data locally',
    disabled: true,
    disabledDescription: 'Coming soon'
  }),
];
