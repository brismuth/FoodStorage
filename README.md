FoodStorage
===========

This is a very basic web app for tracking the expiration dates of your food storage. I built it in conjunction with my wife for our History of Creativity class at BYU. I wanted to experiment with the [Meteor framework](https://www.meteor.com/) so I used this project as an opportunity to do so.

This is what it looks like:

![Screenshot](https://raw.githubusercontent.com/brismuth/FoodStorage/master/demo/mainView.png "Screenshot")

You can add more items at the top. There is a date picker for the expiration, and when items are close to expiring, their expiration date turns red. If you hover over an item, a button appears on it to delete it:

![Screenshot](https://raw.githubusercontent.com/brismuth/FoodStorage/master/demo/remove.png "Screenshot")

[Meteor](https://www.meteor.com/) uses MongoDB on the backend and manages sockets and realtime data sharing for you. That means that if you have this food storage app open on two computers, changes to one will immediately show up on the other as well.
