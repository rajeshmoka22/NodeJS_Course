import { PermissionList } from "../../types/groupInterface";

export const groupMockData = [
  {
    id: "random-user-group-id-543535",
    name: "TestUserGrop",
    permissions: [
      PermissionList.READ,
      PermissionList.SHARE,
      PermissionList.WRITE,
    ]
  },
  {
    id: "random-admin-group-id-345465",
    name: "AdminGroup",
    permissions: [
      PermissionList.READ,
      PermissionList.SHARE,
      PermissionList.WRITE,
      PermissionList.DELETE,
      PermissionList.UPLOAD_FILES,
    ]
  }
];

export const userMockData = [{
  id:       'random-user-675675787-876876',
  login:    'RohitSharma',
  password: 'asffgsg',
  age:       32,
  isDeleted: true,
}, {
  id:       'ranodmm-user-782643-2384347',
  login:    'ViratKohli',
  password: 'dfgeastgdt',
  age:       33,
  isDeleted: false,
}];