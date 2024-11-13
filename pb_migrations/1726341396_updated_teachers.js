/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0fynhuyn",
    "name": "mobile_no",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{12,13}$"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7e96ucos",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0fynhuyn",
    "name": "mobile_no",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7e96ucos",
    "name": "user",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
