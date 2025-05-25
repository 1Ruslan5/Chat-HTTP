import env from "../../env";

export class AppProvider {
  getBaseUrl(): string {
    return env.BASE_URL;
  }
}
