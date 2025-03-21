import {
  useQuery,
  UseQueryResult,
  QueryKey,
  UseQueryOptions,
} from "@tanstack/react-query";
import { axiosInstance } from "../config/axios";
import { APIError } from "../types/api";

type UseGetOptions<TData> = Omit<
  UseQueryOptions<TData, APIError, TData>,
  "queryKey" | "queryFn"
> & {
  url: string;
  key: QueryKey;
  params?: Record<string, unknown>;
};

export function useGet<TData>({
  url,
  key,
  params,
  ...options
}: UseGetOptions<TData>): UseQueryResult<TData, APIError> {
  return useQuery<TData, APIError, TData>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axiosInstance.get<TData>(url, { params });
      return data;
    },
    ...options,
  });
}
