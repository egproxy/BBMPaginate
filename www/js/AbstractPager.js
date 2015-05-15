// Example Usage: 
/*
  Foo = AbstractPager.extend({});

  new Foo([], { 
    queryMap: {
      pageNumber: "someIdentifier",
      rsltAmount: "items"
    },
    paginate: {
      someIdentifer: 3,   // start at page 3
      items: 30           // 30 results per page
    }
  });

*/
var AbstractPager = Backbone.Collection.extend({
  constructor: function(){
    // Default values
    this.queryMap = {
      pageNumber: "page",   // query string name for page number
      pageSize: "size"      // query string name for results per page
    };
    this.paginate = {
      currentPage: 1,       // defaults to 1st page
      expected: 10,         // defaults to 10 per page
      startPage: 1,
      endPage: null         // Can automatically detect
    };
    // Setup attributes if options was given
    AbstractPager.prototype.initialize.apply(this, arguments);
    // Delegate back to Backbone collection so nothing breaks
    Backbone.Collection.apply(this, arguments);
  },
  initialize: function(models, options) {
    options = options || {};
    this.queryMap = _.extend( this.queryMap, options.queryMap || {} );
    this.paginate = _.extend( this.paginate, options.paginate || {} );
    this.cacheRet = _.memoize(this.fetch, JSON.stringify);
  },
  getPage: function(options) {
    var self = this,
        $dfd = $.Deferred();
    options = options || {};
    var queryHash = {};
    queryHash[this.queryMap.pageNumber] = this.paginate.currentPage;
    queryHash[this.queryMap.pageSize] = this.paginate.expected;
    options.data = _.extend(queryHash, options.data || {});

    $.when(this.cacheRet.call(this, options))
    .done(function(data){
      $dfd.resolve(self.reset(data, {silent: false}));
    });
    queryHash = null;
    return $dfd.promise();
  },
  incrementPage: function(callFetch) {
    ++this.paginate.currentPage;
    if( callFetch )
      return this.getPage();
  },
  decrementPage: function(callFetch) {
    if( this.paginate.currentPage > this.paginate.startPage ) {
      --this.paginate.currentPage;
      if( callFetch )
        return this.getPage();
    }
  }
});
