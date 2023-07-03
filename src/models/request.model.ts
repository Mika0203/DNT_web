export type SearchQuery = {
  page?: number;
  limit?: number;
  project?: string;
  lang?: string;
  search?: string;
};

export type UserAddProps = {
  password: string;
  clientId: string;
  name: string;
  securityKey: string;
  email: string;
};

export interface DomainAddProps {
  project: string;
  domain: string;
  lang: string;
  code: string;
  dataType: string;
  abbreviation: string | null;
  description: string | null;
}
