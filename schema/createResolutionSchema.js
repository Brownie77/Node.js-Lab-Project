export default {
    type: "object",
    properties: {
        resolution: {
            type: "string",
            minLength: 10,
            maxLength: 400,
        },
    },
    required: ["resolution"],
    additionalProperties: false
}
