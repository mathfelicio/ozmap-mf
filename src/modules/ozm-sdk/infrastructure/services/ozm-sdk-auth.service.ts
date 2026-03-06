import { BadRequestException, Injectable } from "@nestjs/common";
import OZMapSDK from "@ozmap/ozmap-sdk";
import { loadEnv } from "../../../../common/helpers/load-env.helper";
import { IOzmSdkAuthService } from "../../domain/interfaces/ozm-sdk.service.interface";

@Injectable()
export class OzmSdkAuthService implements IOzmSdkAuthService {
  constructor() {}

  get auth(): OZMapSDK {
    loadEnv();

    const ozmapUrl = process.env.OZMAP_API_BASE_URL ?? "http://ozmap-mock:5000";
    const login = process.env.OZMAP_API_LOGIN ?? "login";
    const password = process.env.OZMAP_API_PASSWORD ?? "senha";

    try {
      return new OZMapSDK(ozmapUrl, { login, password });
    } catch (error) {
      throw new BadRequestException(
        `Problema ao autenticar na API OZMap: ${error}`,
      );
    }
  }
}
