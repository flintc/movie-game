const { json, send } = require("micro");
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

  let payload;
  try {
    payload = await json(req);
  } catch (error) {
    send(res, 400, { error });
    return;
  }

  try {
    const {
      id,
      event: { op, data },
      table,
      trigger,
    } = payload;
    fetch(HGE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: MUTATION_SET_TIME_REMAINING,
        variables: { roomName: data.new.name },
      }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          send(res, 500, { response, test: "???", name: data.new.name });
        }
        return response.json();
      })
      .then(function (result) {
        send(res, 200, { result });
      });

    //   const result = await query({
    //     query: MUTATION_SET_TIME_REMAINING,
    //     endpoint: HGE_ENDPOINT,
    //     variables: {
    //       roomName: data.new.name,
    //     },
    //   });
    //   send(res, 200, { result });
  } catch (error) {
    send(res, 500, { error, test: "????", name: data.new.name });
  }
};
