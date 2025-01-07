/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("67pnpu85z3xaton")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool3440914406",
    "name": "start_notified",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "bool1803102852",
    "name": "finish_notified",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("67pnpu85z3xaton")

  // remove field
  collection.fields.removeById("bool3440914406")

  // remove field
  collection.fields.removeById("bool1803102852")

  return app.save(collection)
})
