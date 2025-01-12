export const APPLICATION = 'veekhere.tablez';

export class RouteConstants {
  static readonly ROOT = "root";
  static readonly START = "start";
  static readonly HOME = "home";
  static readonly VERIFY_EMAIL = "verify-email";
  static readonly NOT_AUTHORIZED = "not-authorized";
  static readonly NOT_FOUND = "**";
}

export class PathConstants {
  static readonly ROOT = "/";
  static readonly START = `/${RouteConstants.START}`;
  static readonly HOME = `/${RouteConstants.HOME}`;
  static readonly VERIFY_EMAIL = `/${RouteConstants.VERIFY_EMAIL}`;
  static readonly NOT_AUTHORIZED = `/${RouteConstants.NOT_AUTHORIZED}`;
  static readonly NOT_FOUND = `${RouteConstants.NOT_FOUND}`;
}

export class RouteTitles {
  static readonly ROOT = "Tablez";
  static readonly HOME = "Home";
}

export class StoreConstants {
  static readonly LOADER = "loader";
  static readonly COLUMN_DESCRIPTORS = "columnDescriptors";
  static readonly TABLE_TEMPLATES = "tableTemplates";
}

export class StoragePathConstants {
  static readonly ROOT = "tablez";

  static templates(userId: string): string {
    return `${StoragePathConstants.ROOT}/${userId}/templates`;
  }

  static tables(userId: string): string {
    return `${StoragePathConstants.ROOT}/${userId}/tables`;
  }
}
