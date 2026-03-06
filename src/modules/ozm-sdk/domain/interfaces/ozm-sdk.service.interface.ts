import OZMapSDK from "@ozmap/ozmap-sdk";

export const OZM_SDK_AUTH_SERVICE = Symbol("OZM_SDK_AUTH_SERVICE");

export interface IOzmSdkAuthService {
  get auth(): OZMapSDK;
}
