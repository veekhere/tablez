import { StringUtils } from '@utils/string.utils';

export enum FirebaseErrorCode {

  /**
   * Auth errors.
   */

  EmailAlreadyInUse = 'The provided email is already in use',
  IdTokenExpired = 'The provided Firebase ID token is expired',
  IdTokenRevoked = 'The Firebase ID token has been revoked',
  InsufficientPermission = 'The credential has insufficient permission to access the requested Authentication resource',
  InternalError = 'The Authentication server encountered an unexpected error while trying to process the request',
  InvalidCredential = 'The credential cannot be used to perform the desired action',
  InvalidEmail = 'The provided value for the email user property is invalid',
  InvalidIdToken = 'The provided ID token is not a valid Firebase ID token',
  InvalidPassword = 'The provided value for the password user property is invalid',
  MaximumUserCountExceeded = 'The maximum allowed number of users has been exceeded',
  MissingUid = 'A uid identifier is required for the current operation',
  OperationNotAllowed = 'The provided sign-in provider is disabled for your Firebase project',
  SessionCookieExpired = 'The provided Firebase session cookie is expired',
  SessionCookieRevoked = 'The Firebase session cookie has been revoked',
  TooManyRequests = 'The number of requests exceeds the maximum allowed',
  UserNotFound = 'There is no existing user record corresponding to the provided identifier.',
  WeakPassword = 'Password should be at least 6 characters',

  /**
   * Firestore errors.
   */

  ObjectNotFound = 'No object exists at the desired reference.',
  BucketNotFound = 'No bucket is configured for Cloud Storage',
  ProjectNotFound = 'No configured project could be found.',
  QuotaExceeded = 'Quota on your Cloud Storage bucket has been exceeded',
  Unauthenticated = 'User is unauthenticated',
  Unauthorized = 'User is not authorized to perform the desired action',
  RetryLimitExceeded = 'The maximum time limit on an operation has been exceeded',
  Canceled = 'User canceled the operation',
  Unknown = 'An unknown error occurred',
}

export namespace FirebaseErrorCode {
  export function explain(code: string): string {
    const enumKey = StringUtils.toPascalCase(code?.replace(/storage\/|auth\//gm, ''));
    return FirebaseErrorCode[enumKey as keyof typeof FirebaseErrorCode] as string ?? FirebaseErrorCode.Unknown;
  }
}
