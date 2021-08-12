

class Schema {
  createPatientSchema = {
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

  validate(data, schema) {
        const validate = ajv.compile(schema)
        const valid = validate(data);
        return valid;
  }
}


export default new Schema();