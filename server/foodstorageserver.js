FoodStorageOptions = new Meteor.Collection("foodstorageoptions");

Meteor.publish("foodstorageoptions", function () {
  return FoodStorageOptions.find({});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'FoodStorageObjects': 1}});
});


// fill out the food storage options collection
Meteor.startup(function () {
  var foodstorageoptions = [
    {_id:"Wheat",name:"Wheat",image:"storage/wheat.png"},
    {_id:"Flour",name:"Flour",image:"storage/flour.png"},
    {_id:"Oats",name:"Oats",image:"storage/oats.png"},
    {_id:"Rice",name:"Rice",image:"storage/rice.png"},
    {_id:"Pasta",name:"Pasta",image:"storage/pasta.png"},
    {_id:"VegetableOil",name:"Vegetable Oil",image:"storage/vegetableoil.png"},
    {_id:"PeanutButter",name:"Peanut Butter",image:"storage/peanutbutter.png"},
    {_id:"Beans",name:"Beans",image:"storage/beans.png"},
    {_id:"Honey",name:"Honey",image:"storage/honey.png"},
    {_id:"Sugar",name:"Sugar",image:"storage/sugar.png"},
    {_id:"Jams",name:"Jams",image:"storage/berries.png"},
    {_id:"DryMilk",name:"Dry Milk",image:"storage/drymilk.png"},
    {_id:"Salt",name:"Salt",image:"storage/salt.png"},
    {_id:"Vinegar",name:"Vinegar",image:"storage/vinegar.png"},
    {_id:"Water",name:"Water",image:"storage/water.png"}
  ];
  FoodStorageOptions.remove({});
  for (var i = 0; i < foodstorageoptions.length; i++)
  {
    var option = foodstorageoptions[i];
    FoodStorageOptions.insert({_id: option._id, name: option.name, image: option.image});
  }
});

Meteor.methods({
  addFoodStorage: function (userID, foodStorageID, expirationDate, note) {
    var foodStorageOption = FoodStorageOptions.findOne({_id: foodStorageID});
    var uniqueID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});

    Meteor.users.update({
      _id: userID,
    }, {
      $push: {
        'FoodStorageObjects' : {
          uniqueID: uniqueID,
          name: foodStorageOption.name,
          image: foodStorageOption.image,
        	exp: expirationDate, 
        	note: note
        }
      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },

	removeFoodStorage: function (userID, uniqueID) {
    Meteor.users.update({
      _id: userID,
    }, {
      $pull: {
        'FoodStorageObjects' : {
        	uniqueID: uniqueID, 
        }
      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  }

});
