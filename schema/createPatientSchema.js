export default {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 2
      },
    },
    required: ["name"],
    additionalProperties: false
  }
  