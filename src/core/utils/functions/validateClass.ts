import { validate, ValidationError } from 'class-validator';
import { InvalidField, InvalidFieldsException } from '../../exceptions/InvalidFieldsException';


export async function validateClass(
  obj: Object,
  Entity: new () => any,
): Promise<void> {
  const entity = Object.assign(new Entity(), obj);

  const errors = await validate(entity);
  if (errors.length === 0) return;

  const invalidFields = getInvalidFields(errors);
  throw new InvalidFieldsException(invalidFields);
}

export function getInvalidFields(errors: ValidationError[]): InvalidField[] {
  const fields: InvalidField[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      fields.push({
        message: String(Object.values(error.constraints as any)[0]),
        name: error.property,
      });
    }

    if (Array.isArray(error.children) && error.children.length > 0) {
      fields.push(...getInvalidFields(error.children));
    }
  });

  return fields;
}
