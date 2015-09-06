describe('Service: ngtrumbitta.services.selectioncache', function() {
  'use strict';
  var selectionCacheService;

  beforeEach(module('ngtrumbitta.services.selectioncache'));
  beforeEach(inject(function(_selectionCacheService_) {
    selectionCacheService = _selectionCacheService_;
  }));

  it('should init a selection cache with a non-empty optional handler', function() {
    selectionCacheService.init('optionalHandler');
    var myEmptySelectionCacheHandler = selectionCacheService.init('');

    expect(selectionCacheService.getCache('optionalHandler')).toBeDefined();
    expect(myEmptySelectionCacheHandler).not.toBeDefined();
    expect(selectionCacheService.getCache('')).not.toBeDefined();
  });

  it('should init a selection cache without a handler', function() {
    var mySelectionCacheHandler = selectionCacheService.init();

    expect(selectionCacheService.getCache(mySelectionCacheHandler)).toBeDefined();
  });

  it('should add elements to a selectionCache', function() {
    var myCacheHandler = selectionCacheService.init('optionalHandler');
    var mockSelectionCache = [0, 1, 2];
    selectionCacheService.add(myCacheHandler, 0);
    selectionCacheService.add(myCacheHandler, 1);
    selectionCacheService.add(myCacheHandler, 2);

    expect(selectionCacheService.getCache(myCacheHandler)).toEqual(mockSelectionCache);
  });

  it('should not add duplicate elements to a selectionCache', function() {
    var myCacheHandler = selectionCacheService.init('optionalHandler');
    var mockSelectionCache = [0, 1, 2];
    selectionCacheService.add(myCacheHandler, 0);
    selectionCacheService.add(myCacheHandler, 1);
    selectionCacheService.add(myCacheHandler, 2);
    expect(selectionCacheService.getCache(myCacheHandler)).toEqual(mockSelectionCache);

    selectionCacheService.add(myCacheHandler, 1);
    expect(selectionCacheService.getCache(myCacheHandler)).toEqual(mockSelectionCache);
  });

  it('should get a list of selection caches', function() {
    var mockSelectionCacheList = { optionalHandler1: [], optionalHandler2: [] };
    selectionCacheService.init('optionalHandler1');
    selectionCacheService.init('optionalHandler2');

    expect(selectionCacheService.getCaches()).toEqual(mockSelectionCacheList);
  });

  describe('Once init and filled', function() {
    var myCacheHandler1,
        myCacheHandler2;

    beforeEach(function() {
      myCacheHandler1 = selectionCacheService.init();
      myCacheHandler2 = selectionCacheService.init();

      selectionCacheService.add(myCacheHandler1, 1);
      selectionCacheService.add(myCacheHandler2, 1);
    });

    it('should remove an item from a selection cache', function() {
      selectionCacheService.remove(myCacheHandler1, 1);
      expect(selectionCacheService.getCache(myCacheHandler1)).toEqual([]);
      expect(selectionCacheService.remove(myCacheHandler1, 1)).not.toBeDefined();
    });

    it('should purge a selection cache', function() {
      selectionCacheService.purge(myCacheHandler1);

      expect(selectionCacheService.getCache(myCacheHandler1)).toEqual([]);
    });

    // it('should purge all selection caches', function () {
    //   selectionCacheService.purgeAll();
    // foreach key, empty
    //   expect(selectionCacheService.getCaches).toEqual({});
    // });

    it('should destroy a selection cache', function() {
      selectionCacheService.destroy(myCacheHandler1);

      expect(selectionCacheService.getCache(myCacheHandler1)).not.toBeDefined();
    });

    it('should destroy all selection caches', function() {
      selectionCacheService.destroyAll();

      expect(selectionCacheService.getCaches()).toEqual({});
    });

  });
});
