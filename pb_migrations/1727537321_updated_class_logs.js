/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // remove
  collection.schema.removeField("qoytpikr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wtqs3jc9",
    "name": "finished",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qoytpikr",
    "name": "topic",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wtqs3jc9",
    "name": "completed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
