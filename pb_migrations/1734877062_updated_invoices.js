/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("929km9pp8hqphu3")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_s1mXOzd` ON `invoices` (`unq_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a83banxj",
    "name": "unq_id",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("929km9pp8hqphu3")

  collection.indexes = []

  // remove
  collection.schema.removeField("a83banxj")

  return dao.saveCollection(collection)
})
