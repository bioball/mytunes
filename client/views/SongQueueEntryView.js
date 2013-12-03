// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.SongQueueEntryView = Backbone.View.extend({
  tagName: 'li',

  template: _.template('<button class="removeButton">X</button><%= artist %> - <%= title %>'),

  events: {
    'click .removeButton': 'remove'
  },

  render: function(){
    // var artist = this.model.get('artist');
    // var title = this.model.get('title');
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  remove: function(){

    // var col = this.model.collection;
    // console.log("before", col.toJSON());
    // this.model.collection.remove(this.model);
    this.model.trigger('triggle', this.model);
    // console.log("after", col.toJSON());

  }


});