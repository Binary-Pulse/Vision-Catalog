import { client } from ".";

(async () => {
  const schemaRes = await client.schema.getter().do();
  console.log(schemaRes);
})();
