export interface IFailureHandlerService {
  handleFailure(
    type: string,
    data: any,
    error: any,
    options?: {
      maxRetries?: number;
      retryIntervalMs?: number;
      metadata?: Record<string, any>;
    },
  ): Promise<void>;
}

export const FAILURE_HANDLER_SERVICE = Symbol("FAILURE_HANDLER_SERVICE");
