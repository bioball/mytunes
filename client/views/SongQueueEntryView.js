// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.SongQueueEntryView = Backbone.View.extend({
  tagName: 'li',

  template: _.template('<%= artist %> - <%= title %><button class="remove">X</button>'),

  events: {
    'click .remove': 'remove'
  },

  render: function(){
    // var artist = this.model.get('artist');
    // var title = this.model.get('title');
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  remove: function(){
    var temp = this.model.collection;
    this.model.collection.remove(this.model);
    temp.render();
  }


});