import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "../config/axios";
import { APIError } from "../types/api";

interface UsePostOptions<TData> {
  url: string;
  onSuccess?: (data: TData) => void;
  onError?: (error: APIError) => void;
  invalidateQueries?: string[];
}

export function usePost<TData, TVariables>({
  url,
  onSuccess,
  onError,
  invalidateQueries = [],
}: UsePostOptions<TData>): UseMutationResult<TData, APIError, TVariables> {
  const queryClient = useQueryClient();

  return useMutation<TData, APIError, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await axiosInstance.post<TData>(url, variables);
      return data;
    },
    onSuccess: (data) => {
      invalidateQueries.forEach((query) => {
        queryClient.invalidateQueries({ queryKey: [query] });
      });

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: APIError) => {
      if (onError) {
        onError(error);
      }
    },
  });
}
