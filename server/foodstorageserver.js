FoodStorageOptions = new Meteor.Collection("foodstorageoptions");

// server: publish the rooms collection, minus secret info.
Meteor.publish("foodstorageoptions", function () {
  return FoodStorageOptions.find({});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'FoodStorageObjects': 1}});
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
