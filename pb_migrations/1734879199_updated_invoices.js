/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("929km9pp8hqphu3")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a83banxj",
    "name": "unq_id",
    "type": "text",
    "required": false,
    "presentable": true,
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

  // update
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
})
