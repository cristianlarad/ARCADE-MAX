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
  onError?: (error: APIError, variables: any, context: any) => void;
  invalidateQueries?: string[];
}

export function usePost<TData, TVariables>({
  url,
  onSuccess,
  onError,
  invalidateQueries = [],
}: UsePostOptions<TData>): UseMutationResult<TData, Error, TVariables> {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await axiosInstance.post<TData>(url, variables);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (data) => {
      invalidateQueries.forEach((query) => {
        queryClient.invalidateQueries({ queryKey: [query] });
      });

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      }
    },
  });
}
