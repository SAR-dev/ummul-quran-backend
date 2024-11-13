/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_O10LSM9` ON `students` (`name`)",
    "CREATE UNIQUE INDEX `idx_KqEOU1a` ON `students` (`user`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eas3mxvd",
    "name": "mobile",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{12,13}$"
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gbbjdkfp",
    "name": "utc",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pmknksge",
    "name": "user",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubqln7ji",
    "name": "whatsapp_no",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{12,13}$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_O10LSM9` ON `students` (`name`)"
  ]

  // remove
  collection.schema.removeField("eas3mxvd")

  // remove
  collection.schema.removeField("gbbjdkfp")

  // remove
  collection.schema.removeField("pmknksge")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubqln7ji",
    "name": "whatsapp_no",
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

  return dao.saveCollection(collection)
})
