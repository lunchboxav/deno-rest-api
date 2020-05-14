import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";

import response from "./response.ts"
Drash.Http.Response = response;

import BandResource from "./band_resource.ts"

class AllBandsResource extends Drash.Http.Resource {
  static paths = ["/bands/"];

  public GET() {
    this.response.body = this.getAllBands();
    return this.response;
  }

  protected getAllBands() {
    let records = null;

    try {
      let fileContentsRaw = Deno.readFileSync("./band.json");
      let decoder = new TextDecoder();
      records = decoder.decode(fileContentsRaw);
      JSON.parse(records);
    } catch (error) {
      throw new Drash.Exceptions.HttpException(
        400,
        `Error getting band records". Error: ${error.message}.`
      );
    }

    return records;
  }
}

const server = new Drash.Http.Server({
  response_output: "text/html",
  resources: [AllBandsResource, BandResource],
});
server.run({
  hostname: "localhost",
  port: 1447,
});
console.log("Server listening: http://localhost:1447");
