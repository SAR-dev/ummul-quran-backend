/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6bzpknx7",
    "name": "year",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 2020,
      "max": 2099,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6bzpknx7",
    "name": "year",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
})
