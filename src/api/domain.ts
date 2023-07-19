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

  static async addDomain(data: DomainAddProps): Promise<ResponseData<DomainModel>> {
    const res = await axios(`${apiURL}/v1/admin/domain`, {
      method: 'POST',
      data: data,
    });
    return res.data;
  }

  static async modifyDomain(
    id: number | string,
    data: DomainAddProps
  ): Promise<ResponseData<DomainModel>> {
    const res = await axios(`${apiURL}/v1/admin/domain`, {
      method: 'PUT',
      data: {...data, id},
    });
    return res.data;
  }

  static async getProjectNameList(): Promise<ResponseData<string[]>> {
    return (await axios(`${apiURL}/v1/admin/domain/project`).catch((e) => e.response)).data;
  }

  static async deleteDomain(id: number | string): Promise<{
    success: boolean;
    msg: string;
  }> {
    return (
      await axios(`${apiURL}/v1/admin/domain/${id}`, {
        method: 'DELETE',
      })
    ).data;
  }
}
