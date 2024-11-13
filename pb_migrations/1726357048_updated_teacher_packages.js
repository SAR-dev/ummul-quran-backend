/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tzxkadjhujtd93d")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_eMXWdFA` ON `teacher_packages` (\n  `teacher`,\n  `monthly_package`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ncit6h8",
    "name": "monthly_package",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "w962q8thgapm7e2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tzxkadjhujtd93d")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_eMXWdFA` ON `teacher_packages` (\n  `teacher`,\n  `package`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ncit6h8",
    "name": "package",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "w962q8thgapm7e2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
