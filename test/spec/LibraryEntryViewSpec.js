describe('LibraryEntryView', function() {
  var view, model;

  beforeEach(function() {
    model = new MyTunes.Models.SongModel({
      artist: 'Fakey McFakerson',
      title: 'Never Gonna Mock You Up',
      url: 'example/url'
    });
    spyOn(MyTunes.Models.SongModel.prototype, 'enqueue'); // Uncomment this when working on the second test
    // spyOn(MyTunes.Models.SongModel.prototype, 'play');
    view = new MyTunes.Views.LibraryEntryView({model: model});
    view.render();
  });

  // it('plays clicked songs', function(){
  //   view.$el.children().first().click();
  //   expect(model.play).toHaveBeenCalled();
  // });

  // Comment out the above spec when implementing the below
  it('queues clicked songs', function(){
    view.$el.children().first().click();
    expect(model.enqueue).toHaveBeenCalled();
  });
});

// localStorage['playlist'].each(function(plist){
//   <%= plist.name %>
//   for(var song in plist.list){
//     <li><%= song %></li>
//   }
// })
// [
//   {
//     name: "workout",
//     list: {
//       c1: true,
//       c3: true
//     }
//   },
//   {
//     name: "sleeping",
//     list: {
//       c4: true,
//       c10: true
//     }
//   }
// ]