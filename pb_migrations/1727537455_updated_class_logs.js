/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f2o8bnvt",
    "name": "student_invoice",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qcfeo7fgy5w8qwl",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wl3nruhu",
    "name": "teacher_invoice",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jvnlkzozsz56h5i",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // remove
  collection.schema.removeField("f2o8bnvt")

  // remove
  collection.schema.removeField("wl3nruhu")

  return dao.saveCollection(collection)
})
