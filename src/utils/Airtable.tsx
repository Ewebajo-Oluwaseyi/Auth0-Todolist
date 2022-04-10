import Airtable from "airtable";

// api keys
const base = new Airtable({ apiKey: "keyUz6Xy9kV57MBRU" }).base(
  "apptIvpUGF8EMa5w2"
);

const table = base("todo");

export default table;
