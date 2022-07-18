const { normalize, schema, denormalize } = require("normalizr");

const textSchema = new schema.Entity("text");
const timeSchema = new schema.Entity("time");
const authorSchema = new schema.Entity(
  "author",
  {
    time: [timeSchema],
    text: [textSchema],
  },
  { idAttribute: "emailChat" }
);
const messagesSchema = new schema.Array({ author: authorSchema });

const normalizrTesting = (data) => {
  const normalizedData = normalize(data, messagesSchema);

  const denormalizedData = denormalize(
    normalizedData.result,
    messagesSchema,
    normalizedData.entities
  );
  const compressedData = JSON.stringify(normalizedData).length;

  const uncompressedData = JSON.stringify(denormalizedData).length;

  let percentage = `${parseInt(100-(compressedData*100/uncompressedData))}%`
  return percentage

};
module.exports = normalizrTesting