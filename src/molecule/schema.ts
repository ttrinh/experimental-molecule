export type AtomValue = string | number | boolean | undefined;

export interface AtomSchemaAttributes {
  required: boolean;
  type: "string" | "number" | "boolean" | "undefined";
  defaultValue: AtomValue;
}

export interface AtomSchema extends AtomSchemaAttributes {
  isType: (type: AtomSchemaAttributes["type"]) => AtomSchema;
  isRequired: () => AtomSchema;
  hasDefaultValue: (v: AtomValue) => AtomSchema;
}

export interface MoleculeSchema {
  [key: string]: AtomSchema;
}

export const atomSchema = (): AtomSchema => ({
  required: false,
  type: "undefined",
  defaultValue: undefined,
  isType: function (type) {
    this.type = type;
    return this;
  },
  isRequired: function () {
    this.required = true;
    return this;
  },
  hasDefaultValue: function (value) {
    this.defaultValue = value;
    return this;
  },
});

export const moleculeSchema = (moleculeSchema: MoleculeSchema) => ({
  //..
});

atomSchema().isRequired().isType("string");
