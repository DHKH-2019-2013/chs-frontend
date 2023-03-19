import { GetParams } from "./http.service.i";

export class HttpService {
  static async get(url: string, params?: GetParams): Promise<any> {
    return await fetch(`${url}?${new URLSearchParams({ ...params })}`, {
      method: "GET",
    })
      .then((response: any) => {
        if (!response.ok) throw new Error(response.message);
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}
