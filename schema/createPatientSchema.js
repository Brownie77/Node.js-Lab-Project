export default {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 2
      },
      user_id: {
        type: "string",
        minLength: 36
      }
    },
    required: ["name", "user_id"],
    additionalProperties: false
  }

  
