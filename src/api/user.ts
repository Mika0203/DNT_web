import axios from 'axios';

import {SearchQuery, ResponseData, UserAddProps, PageData} from '@src/models';
import {getAPIURL, queryToString} from '@src/utils';
import {UserModel} from '@src/models';

const apiURL = getAPIURL();

export default class UserAPI {
  static async addUser(data: UserAddProps): Promise<ResponseData<UserModel>> {
    const res = await axios(`${apiURL}/v1/admin/users`, {
      method: 'POST',
      data,
    }).catch((e) => {
      console.error(`${e}`);
      return e.response;
    });

    return res.data;
  }

  static async getUserList(query: SearchQuery): Promise<ResponseData<PageData<UserModel[]>>> {
    const res = await axios(`${apiURL}/v1/admin/users?${queryToString(query)}`);
    return res.data;
  }

  static async deleteUser(seq: number): Promise<ResponseData<UserModel>> {
    const res = await axios(`${apiURL}/v1/admin/users/${seq}`, {
      method: 'DELETE',
    });
    return res.data;
  }
}
