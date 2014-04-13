Deps.autorun(function () {
    Meteor.subscribe("userData");
    Meteor.subscribe("foodstorageoptions");
});
FoodStorageOptions = new Meteor.Collection("foodstorageoptions");

Meteor.absoluteUrl.defaultOptions.rootUrl = "http://foodstoragefriend.com/"

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
      $('#ExpDatePicker').val("");
      $('#FoodStorageNote').val("");
    }
  }
});

var dateParser = /^(\d{2})[\/\- ](\d{2})[\/\- ](\d{4})/;
Template.FoodStorageObjects.FoodStorageObjects = function () {
  function expCompare(a,b){
    dateA = a.exp.replace(dateParser,"$3$1$2");
    dateB = b.exp.replace(dateParser,"$3$1$2");
    if (dateA>dateB) return 1;
    if (dateA<dateB) return -1;
    return 0; 
  }

  if (Meteor.user() && Meteor.user().FoodStorageObjects)
    return Meteor.user().FoodStorageObjects.sort(expCompare);
};

Template.UsersFoodStorage.LoggedIn = function () {
  return (Meteor.user() != null);
}

Template.FoodStorageObject.HasNote = function () {
  return this.note !== "";
}

Template.FoodStorageObject.CloseToExpiration = function () {
  var d = new Date();
  d.setMonth(d.getMonth() + 3);
  var expiringSoon = d.getFullYear().toString() + ("0" + d.getMonth()).slice(-2) + ("0" + d.getDate()).slice(-2);
  return this.exp.replace(dateParser,"$3$1$2") < expiringSoon;
}

Template.FoodStorageObject.events({
  'click #deleteObject' : function (evt) {
    Meteor.call("removeFoodStorage", Meteor.userId(), this.uniqueID);
  }
});
