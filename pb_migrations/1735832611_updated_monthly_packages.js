/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("w962q8thgapm7e2")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool3523658193",
    "name": "private",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("w962q8thgapm7e2")

  // remove field
  collection.fields.removeById("bool3523658193")

  return app.save(collection)
})
