import type { ColumnSpecification } from "./pharos-table";

export interface ComponentArgs {
  columns?: ColumnSpecification[]
  showPagination?: boolean;
};

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  columns: [
    {
      name: 'Item',
      field: 'item',
    },
    {
      name: 'Filename',
      field: 'filename',
    },
    {
      name: 'Expired Date',
      field: 'expired_date',
    },
    {
      name: 'Created On',
      field: 'created_on',
    },
    {
      name: 'University',
      field: 'university',
    },
  ],
};
