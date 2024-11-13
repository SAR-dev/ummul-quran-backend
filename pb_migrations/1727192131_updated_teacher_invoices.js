/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uek1gpet",
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
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uek1gpet",
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
