Questions = new Mongo.Collection("questions");

if (Meteor.isClient) {
  Template.body.helpers({
    questions: function() {
      return Questions.find();
    }
  });

  Template.body.events({
    'submit .new-question': function(event) {
      var qText = event.target.qText.value;

      if (qText == "") return false;

      Questions.insert({ 
        qText: qText,
        value: 0,
        createdAt: new Date()
      });

      event.target.qText.value = "";
      
      return false;
    }
  });

  Template.question.events({
    'click .arrowUp': function() {
      Questions.update(this._id, {$set: {value: this.value + 1}});
      return false;
    },
    'click .arrowDown': function() {
      Questions.update(this._id, {$set: {value: this.value - 1}});
      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
