var models = require('./mongoose_connection')
var delay = require('delay')

models.event_model.collection.drop()
models.location_model.collection.drop()
models.tag_model.collection.drop()


location_ids = []
tag_ids = []

// Insert tags seed data
var tags = ["Tapas", "Steak", "Beer", "Thai", "Cupcakes"]


tags.forEach(function (tag) {
  models.tag_model.create({
    title:tag
  })
})


// Insert locations seed data
var locations = [
  {"latitude":55.943743, "longitude":-3.223609,"postcode": 'EH11 1HD',"address": '12 Duff Road', "city":'Edinburgh', "description":'My house'},
  {"latitude":55.923743, "longitude":-3.221609,"postcode": 'EH11 3RW',"address": '24 Radical Road', "city":'Edinburgh', "description":'Social Centre'},
  {"latitude":55.911743, "longitude":-3.217609,"postcode": 'EH9 2WU',"address": '1 Elm Row', "city":'Edinburgh', "description":'Old country house'},
  {"latitude":55.945743, "longitude":-3.233609,"postcode": 'EH19 3RQ',"address": '455 South Gyle Crescent', "city":'Edinburgh', "description":'Barbaque spot'}
]

locations.forEach(function(location) {
  models.location_model.create({
    latitude: location.latitude,
    longitude: location.longitude,
    postcode: location.postcode,
    address: location.address,
    city: location.city,
    description: location.description
  })
})

function getIds() {
  models.location_model.find({}, '_id', (err, result) => location_ids = result)
  models.tag_model.find({}, '_id', (err, result) => tag_ids = result)
}

function printIds() {
  console.log("tag_ids", tag_ids)
  console.log("location_ids", location_ids)

  models.event_model.create({
    host_id: 1,
    location_id: location_ids[0],
    image_url: "https://www.seriouseats.com/recipes/images/2015/05/Anova-Steak-Guide-Sous-Vide-Photos15-beauty-1500x1125.jpg",
    title:'Learn how to cook tapas with Pancho',
    description: 'A workshop in which our Spanish chef will introduce you into the tapas world',
    type: 1,
    start_date: new Date('2018-12-17'),
    slots:3,
    assistants: [
      {
        user_id:3,
        status:1
      }
    ],
    tags: [
      tag_ids[0]
    ]
  })

  models.event_model.create({
    host_id: 2,
    location_id: location_ids[1],
    image_url: "https://www.seriouseats.com/recipes/images/2015/05/Anova-Steak-Guide-Sous-Vide-Photos15-beauty-1500x1125.jpg",
    title:'Night out with beer tasting',
    description: 'We will learn how to appreciate different beer ingredients and flavours',
    type: 2,
    start_date: new Date('2018-11-17'),
    slots:5,
    assistants: [
      {
        user_id:2,
        status:2
      }
    ],
    tags: [
      tag_ids[0],
      tag_ids[3]
    ]
  })

  models.event_model.create({
    host_id: 3,
    location_id: location_ids[2],
    title:'Steak feast masterclass',
    image_url: "https://www.seriouseats.com/recipes/images/2015/05/Anova-Steak-Guide-Sous-Vide-Photos15-beauty-1500x1125.jpg",
    description: 'Rare, medium-rare or medium-well. However you like your steaks, this is your event',
    type: 1,
    start_date: new Date('2019-11-17'),
    slots:8,
    assistants: [
      {
        user_id:1,
        status:1
      },{
        user_id:2,
        status:1
      },{
        user_id:4,
        status:2
      },{
        user_id:5,
        status:2
      }

    ],
    tags: [
      tag_ids[1],
      tag_ids[2]
    ]
  })

  models.event_model.create({
    host_id: 3,
    location_id: location_ids[3],
    title:'Cupcake competition',
    description: 'Come with your cupcakes ready to take part in this fun competition',
    image_url: "https://www.seriouseats.com/recipes/images/2015/05/Anova-Steak-Guide-Sous-Vide-Photos15-beauty-1500x1125.jpg",
    type: 1,
    start_date: new Date('2018-10-17'),
    assistants: [
      {
        user_id:4,
        status:1
      }
    ],
    tags: [
      tag_ids[4]
    ]
  })
}

setTimeout(getIds, 1500)

setTimeout(printIds, 3000)
