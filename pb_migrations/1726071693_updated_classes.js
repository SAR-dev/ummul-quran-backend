/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  collection.name = "class_logs"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "embm6bph",
    "name": "class_mins",
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
    "id": "skeywfib",
    "name": "teachers_price",
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
    "id": "lwsorrmd",
    "name": "students_price",
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
    "id": "efldiw7n",
    "name": "memo",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qoytpikr",
    "name": "topic",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wtqs3jc9",
    "name": "started",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rh6o7sbi",
    "name": "finished",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yc9l8vgh",
    "name": "start_at",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evsul5p5",
    "name": "finish_at",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  collection.name = "classes"

  // remove
  collection.schema.removeField("embm6bph")

  // remove
  collection.schema.removeField("skeywfib")

  // remove
  collection.schema.removeField("lwsorrmd")

  // remove
  collection.schema.removeField("efldiw7n")

  // remove
  collection.schema.removeField("qoytpikr")

  // remove
  collection.schema.removeField("wtqs3jc9")

  // remove
  collection.schema.removeField("rh6o7sbi")

  // remove
  collection.schema.removeField("yc9l8vgh")

  // remove
  collection.schema.removeField("evsul5p5")

  return dao.saveCollection(collection)
})
