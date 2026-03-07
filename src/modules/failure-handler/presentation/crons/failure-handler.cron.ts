import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FailureRetryService } from "../../application/services/failure-retry.service";

@Injectable()
export class FailureHandlerCron {
  constructor(private readonly failureRetryService: FailureRetryService) {}

  @Cron(CronExpression.EVERY_YEAR)
  async handleCron(): Promise<void> {
    await this.failureRetryService.processPendingFailures();
  }
}
