Deps.autorun(function () {
    Meteor.subscribe("userData");
    Meteor.subscribe("foodstorageoptions");
});
FoodStorageOptions = new Meteor.Collection("foodstorageoptions");


Template.UsersFoodStorage.FoodStorageOptions = function () {
  if (Meteor.user() && Meteor.user().FoodStorageOptions)
    return Meteor.user().FoodStorageOptions;
};

Template.UsersFoodStorage.LoggedIn = function () {
  return (Meteor.user() != null);
}

Template.AddFoodStorageTemplate.rendered = function() {
  $('#FoodStorageSelect').select2({
      query: function (query) {
          var data = {results: []}, i, j, s;
          var regex = new RegExp(query.term, 'i');
          Meteor.subscribe ('foodstorageoptions');
          data.results = FoodStorageOptions.find({'name': regex}).fetch();
          data.results.forEach(function(element, index, array) {
            element.id = element._id;
            element.text = element.name;
          });
          query.callback(data);
      }
  });

  $('#FoodStorageSelect').select2("enable", true);
  $('#ExpDatePicker').datepicker();
}

Template.AddFoodStorageTemplate.events({
  'click #AddStorageButton' : function (evt) {
    var foodStorageID = $('#FoodStorageSelect').val();
    var expirationDate = $('#ExpDatePicker').val();
    if (foodStorageID !== "" && expirationDate !== "") //make sure something is selected
    {
      var note = $('#FoodStorageNote').val();
      Meteor.call("addFoodStorage", Meteor.userId(), foodStorageID, expirationDate, note);
    }
  }
});





