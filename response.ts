import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";

export default class Response extends Drash.Http.Response {
  public generateResponse(): any {
    let schema = {
      status_code: this.status_code,
      status_message: this.getStatusMessage(),
      data: this.body,
      request: {
        method: this.request.method.toUpperCase(),
        uri: this.request.uri,
      },
    };
    return JSON.stringify(schema);
  }
}
