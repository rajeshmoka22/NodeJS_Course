export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupRequest {
  name: string;
  permissions: Permission[];
}

export interface Group extends GroupRequest {
  id: string;
}

export enum PermissionList {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES'
}