export interface ApiError {
  error: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}
