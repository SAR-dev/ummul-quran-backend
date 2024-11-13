/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // remove
  collection.schema.removeField("xbtrfqpa")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xbtrfqpa",
    "name": "timezone",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vgw6dsbejt89j6g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
