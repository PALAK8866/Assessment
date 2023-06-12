import { API_ENDPOINTS, HTTP_METHODS } from '@/helpers/constants';
import { EmptyObject } from '@/types/Common';
import { RowListResponse } from '@/types/Row';
import { requestV1 } from '../rest';

export async function getRowData(params: EmptyObject) {
  return requestV1<EmptyObject, RowListResponse>({ url: API_ENDPOINTS.ROW, method: HTTP_METHODS.GET, queryParams: params });
}
