/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // remove
  collection.schema.removeField("ubqln7ji")

  // remove
  collection.schema.removeField("gbbjdkfp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4ge0qp8h",
    "name": "timezone",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "-12:00 (Baker Island, Howland Island)",
        "-11:00 (American Samoa, Niue)",
        "-10:00 (Hawaii, Tahiti, Aleutian Islands)",
        "-09:00 (Alaska, Gambier Islands)",
        "-08:00 (Pacific Time, US & Canada, Tijuana)",
        "-07:00 (Mountain Time, US & Canada, Arizona)",
        "-06:00 (Central Time, US & Canada, Mexico City, Costa Rica)",
        "-05:00 (Eastern Time, US & Canada, Lima, Bogota)",
        "-04:00 (Atlantic Time, Canada, Caracas, La Paz)",
        "-03:00 (Buenos Aires, Montevideo, São Paulo)",
        "-02:00 (South Georgia/Sandwich Islands)",
        "-01:00 (Azores, Cape Verde)",
        "+00:00 (London, Lisbon, Dublin, Accra)",
        "+01:00 (Berlin, Paris, Madrid, Rome)",
        "+02:00 (Cairo, Johannesburg, Helsinki, Jerusalem)",
        "+03:00 (Moscow, Nairobi, Baghdad, Riyadh)",
        "+04:00 (Dubai, Samara, Seychelles)",
        "+05:00 (Islamabad, Karachi, Tashkent)",
        "+06:00 (Dhaka, Almaty, Thimphu)",
        "+07:00 (Bangkok, Jakarta, Ho Chi Minh City)",
        "+08:00 (Singapore, Beijing, Perth)",
        "+09:00 (Tokyo, Seoul, Pyongyang)",
        "+10:00 (Sydney, Guam, Vladivostok)",
        "+11:00 (Solomon Islands, New Caledonia)",
        "+12:00 (Fiji, Auckland, Kamchatka)"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eas3mxvd",
    "name": "mobile_no",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // add
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

  // remove
  collection.schema.removeField("4ge0qp8h")

  // update
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

  return dao.saveCollection(collection)
})
