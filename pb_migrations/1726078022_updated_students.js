/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_KqEOU1a` ON `students` (`user`)"
  ]

  // remove
  collection.schema.removeField("pq0rysvn")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_O10LSM9` ON `students` (`name`)",
    "CREATE UNIQUE INDEX `idx_KqEOU1a` ON `students` (`user`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pq0rysvn",
    "name": "name",
    "type": "text",
    "required": true,
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
