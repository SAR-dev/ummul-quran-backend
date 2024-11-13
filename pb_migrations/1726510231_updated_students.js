/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xb62jm2h",
    "name": "monthly_package_price",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // remove
  collection.schema.removeField("xb62jm2h")

  return dao.saveCollection(collection)
})
