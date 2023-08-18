import { Collection, Db } from "mongodb";

class AcudienteSchema {
  public database: Db;
  public entity: string;
  public collection: Collection;

  constructor(database: Db) {
    this.database = database;
    this.entity = "acudiente";
    this.collection = this.database.collection(this.entity);
  }

  public async generateCollection(): Promise<void> {
    try {
      await this.database.createCollection(this.entity, {
        capped: true,
        size: 16000,
        max: 100,
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "acu_codigo",
              "acu_nombreCompleto",
              "acu_telefono",
              "acu_direccion",
            ],
            properties: {
              acu_codigo: {
                bsonType: "int",
                minum: 0,
                maximum: 100,
              },
              acu_nombreCompleto: {
                bsonType: "string",
                description: "Debe proporcionar un campo nombre completo",
              },
              acu_telefono: {
                bsonType: "int",
                minum: 0,
                maximum: 100,
              },
              acu_direccion: {
                bsonType: "string",
                description: "Debe proporcionar un campo dirección",
              },
            },
          },
        },
      });
    } catch (error) {}
  }
}
