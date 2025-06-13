export type pagination = {
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
};

export type ApiResult<t> = {
  data: t;
  statusCode: number;
  message: string;
  pagination?: pagination;
};
