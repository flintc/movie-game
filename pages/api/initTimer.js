const { json, send } = require("micro");
const { query } = require("graphqurl");
require("es6-promise").polyfill();
require("isomorphic-fetch");

const HGE_ENDPOINT = process.env.HGE_ENDPOINT;

const MUTATION_SET_TIME_REMAINING = `
mutation SetTimeRemaing ($roomName: String) {
  update_game(where: {name: {_eq: $roomName}}, _set: {time_reamaining: 180000}){
    returning{
      id
      name
      time_reamaining
    }
  }
}
`;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    send(res, 404);
  }

  const payload = req.body;

  try {
    const {
      event: { data },
    } = payload;
    const result = await query({
      query: MUTATION_SET_TIME_REMAINING,
      endpoint: HGE_ENDPOINT,
      variables: {
        roomName: data.new.name,
      },
    });
    send(res, 200, { result });
  } catch (error) {
    send(res, 500, { test: "????", name: data.new.name });
  }
};
