export interface IFailureProcessor {
  type: string;
  retry(
    entity: Record<string, unknown>,
    metadata?: Record<string, unknown>,
  ): Promise<void>;
}

export const FAILURE_PROCESSORS = Symbol("FAILURE_PROCESSORS");
