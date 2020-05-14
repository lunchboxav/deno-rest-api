import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";

export default class BandResource extends Drash.Http.Resource {
  static paths = ["/bands/:id"];

  public GET() {
    let bandId = this.request.getPathParam("id");
    this.response.body = this.getBand(bandId);
    return this.response;
  }

  public POST() {
    let bandId = this.request.getPathParam("id");
    this.response.body = this.postBand(bandId);
    return this.response;
  }

  protected getBand(bandId: number) {
    let record = null;

    try {
      let fileContentsRaw = Deno.readFileSync("./band.json");
      let decoder = new TextDecoder();
      let records = decoder.decode(fileContentsRaw);
      records = JSON.parse(records);
      record = records[bandId];
    } catch (error) {
      throw new Drash.Exceptions.HttpException(
        400,
        `Error getting band with ID "${bandId}". Error: ${error.message}.`
      );
    }

    if (!record) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Band with ID "${bandId}" not found.`
      );
    }

    return record;
  }

  protected postBand(bandId: number) {
    let bandData = {
      id: Number(bandId),
      name: String,
      lastAlbumYear: Number
    }
    const bandName = this.request.getBodyParam("name");
    const bandLastAlbumYear = this.request.getBodyParam("lastAlbumYear");
    let records = null;

    try {
      let fileContentsRaw = Deno.readFileSync("./band.json");
      let encoder = new TextEncoder();
      let decoder = new TextDecoder();
      records = decoder.decode(fileContentsRaw);
      records = JSON.parse(records);
      bandData.name = bandName;
      bandData.lastAlbumYear = bandLastAlbumYear;
      records[bandId] = bandData;
      console.log(records);
      Deno.writeFileSync("./band.json", encoder.encode(JSON.stringify(records)))
      
    } catch (error) {
      throw new Drash.Exceptions.HttpException(
        400,
        `Error adding band with ID "${bandId}". Error: ${error.message}.`
      );
    }

    let message = `you added ${bandName}`;
    return message; 
  }
}
