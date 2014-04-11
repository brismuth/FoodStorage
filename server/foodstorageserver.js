FoodStorageOptions = new Meteor.Collection("foodstorageoptions");

// server: publish the rooms collection, minus secret info.
Meteor.publish("foodstorageoptions", function () {
  return FoodStorageOptions.find({});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'FoodStorageOptions': 1}});
});

Meteor.methods({
  addFoodStorage: function (userID, foodStorageID, expirationDate, note) {
    var foodStorageOption = FoodStorageOptions.findOne({_id: foodStorageID});

    Meteor.users.update({
      _id: userID,
    }, {
      $push: {
        'FoodStorageOptions' : {
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

	removeFoodStorage: function (userID, foodStorageID, expirationDate, note) {
    Meteor.users.update({
      _id: userID,
    }, {
      $push: {
        'foodStorage' : {
        	foodStorageID: foodStorageID, 
        	expirationDate: expirationDate, 
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
  }

});
