import { AxiosError } from "axios";

export interface ErrorResponse {
  error: string;
  message: string;
}

export type APIError = AxiosError<ErrorResponse>;
