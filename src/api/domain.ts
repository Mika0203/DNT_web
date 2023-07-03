import axios from 'axios';

import {getAPIURL, queryToString} from '@src/utils';
import {SearchQuery, DomainModel, DomainAddProps, ResponseData} from '@src/models';

const apiURL = getAPIURL();

export default class DomainAPI {
  static async getList(query: SearchQuery): Promise<ResponseData<DomainModel[]>> {
    const res = await axios(`${apiURL}/v1/admin/domain?${queryToString(query)}`).catch((e) => {
      return e.response;
    });
    return res.data;
  }

  static async addDomain(data: DomainAddProps) {
    const res = await axios(`${apiURL}/v1/admin/domain`, {
      method: 'POST',
      data: data,
    });
    return res.data as {
      code: number;
      data: DomainModel | null;
      msg: string;
      success: boolean;
    };
  }

  static async modifyDomain(id: number, data: DomainAddProps) {
    const res = await axios(`${apiURL}/v1/admin/domain`, {
      method: 'PUT',
      data: {...data, id},
    });
    return res.data as {
      code: number;
      data: DomainModel | null;
      msg: string;
      success: boolean;
    };
  }

  static async getProjectNameList(): Promise<ResponseData<string[]>> {
    const res = await axios(`${apiURL}/v1/admin/domain/project`).catch((e) => {
      return e.response;
    });
    return res.data;
  }

  static async deleteDomain(id: number) {
    const res = await axios(`${apiURL}/v1/admin/domain/${id}`, {
      method: 'DELETE',
    });
    return {
      success: res.data.success,
      msg: res.data.msg,
    } as {
      success: boolean;
      msg: string;
    };
  }
}
