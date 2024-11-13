/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1qbsjiuu",
    "name": "timezone",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "-12:00",
        "-11:00",
        "-10:00",
        "-09:00",
        "-08:00",
        "-07:00",
        "-06:00",
        "-05:00",
        "-04:00",
        "-03:00",
        "-02:00",
        "-01:00",
        "+00:00",
        "+01:00",
        "+02:00",
        "+03:00",
        "+04:00",
        "+05:00",
        "+06:00",
        "+07:00",
        "+08:00",
        "+09:00",
        "+10:00",
        "+11:00",
        "+12:00"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1qbsjiuu",
    "name": "timezone",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "\"-12:00 (Baker Island",
        "Howland Island)\"",
        "\"-11:00 (American Samoa",
        "Niue)\"",
        "\"-10:00 (Hawaii",
        "Tahiti",
        "Aleutian Islands)\"",
        "\"-09:00 (Alaska",
        "Gambier Islands)\"",
        "\"-08:00 (Pacific Time",
        "US & Canada",
        "Tijuana)\"",
        "\"-07:00 (Mountain Time",
        "US & Canada",
        "Arizona)\"",
        "\"-06:00 (Central Time",
        "US & Canada",
        "Mexico City",
        "Costa Rica)\"",
        "\"-05:00 (Eastern Time",
        "US & Canada",
        "Lima",
        "Bogota)\"",
        "\"-04:00 (Atlantic Time",
        "Canada",
        "Caracas",
        "La Paz)\"",
        "\"-03:00 (Buenos Aires",
        "Montevideo",
        "São Paulo)\"",
        "\"-02:00 (South Georgia/Sandwich Islands)\"",
        "\"-01:00 (Azores",
        "Cape Verde)\"",
        "\"+00:00 (London",
        "Lisbon",
        "Dublin",
        "Accra)\"",
        "\"+01:00 (Berlin",
        "Paris",
        "Madrid",
        "Rome)\"",
        "\"+02:00 (Cairo",
        "Johannesburg",
        "Helsinki",
        "Jerusalem)\"",
        "\"+03:00 (Moscow",
        "Nairobi",
        "Baghdad",
        "Riyadh)\"",
        "\"+04:00 (Dubai",
        "Samara",
        "Seychelles)\"",
        "\"+05:00 (Islamabad",
        "Karachi",
        "Tashkent)\"",
        "\"+06:00 (Dhaka",
        "Almaty",
        "Thimphu)\"",
        "\"+07:00 (Bangkok",
        "Jakarta",
        "Ho Chi Minh City)\"",
        "\"+08:00 (Singapore",
        "Beijing",
        "Perth)\"",
        "\"+09:00 (Tokyo",
        "Seoul",
        "Pyongyang)\"",
        "\"+10:00 (Sydney",
        "Guam",
        "Vladivostok)\"",
        "\"+11:00 (Solomon Islands",
        "New Caledonia)\"",
        "\"+12:00 (Fiji",
        "Auckland",
        "Kamchatka)\""
      ]
    }
  }))

  return dao.saveCollection(collection)
})
