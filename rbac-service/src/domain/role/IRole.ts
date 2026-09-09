export interface IRole {
  name: string;
  description: string;
  archived: boolean;
  permissions?: string[];
}