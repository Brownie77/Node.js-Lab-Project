import Ajv from 'ajv';
const { ErrorObject } = Ajv;
const ajValidator = new Ajv({allErrors: true, async: true});
export default function(data, schema) {
    const validate = ajValidator.compile(schema)
    const valid = validate(data);
    return valid;
}