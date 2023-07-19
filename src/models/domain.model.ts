import {ItemModel} from './item.model';

export interface DomainModel extends ItemModel {
  project: string;
  domain: string;
  lang: string;
  code: string;
  abbreviation?: any;
  description?: any;
  dataType: string;
  usedCount: number;
  hash: string;
}
