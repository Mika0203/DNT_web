export interface DomainModel {
  id: number;
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
