import {ItemModel} from './item.model';

export interface UserModel extends ItemModel {
  seq: number;
  name: string;
  email: string;
  password: string;
  securityKey: string;
  clientId: string;
  insertDate: string;
  updateDate: string;
}
