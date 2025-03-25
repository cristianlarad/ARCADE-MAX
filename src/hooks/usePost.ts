import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "../config/axios";
import { APIError } from "../types/api";
import { AxiosResponse } from "axios";

interface UsePostOptions<TData, TVariables = any> {
  url: string;
  headers?: Record<string, string>;
  onSuccess?: (data: TData) => void;
  onError?: (error: APIError, variables: TVariables, context: any) => void;
  invalidateQueries?: string[];
}

export function usePost<TData, TVariables = any>({
  url,
  headers,
  onSuccess,
  onError,
  invalidateQueries = [],
}: UsePostOptions<TData, TVariables>): UseMutationResult<
  TData,
  Error,
  TVariables
> {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      try {
        // Usar AxiosResponse para manejar diferentes tipos de datos
        const response: AxiosResponse<TData> = await axiosInstance.post(
          url,
          variables,
          {
            customHeaders: headers,
          }
        );
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
