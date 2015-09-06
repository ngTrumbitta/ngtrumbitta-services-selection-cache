angular.module('ngtrumbitta.services.selectioncache', [])
  .service('selectionCacheService', function() {
    'use strict';

    var self = this,
        _caches = {};

    this.init = function(cacheHandler) {
      cacheHandler = _parseCacheHandler(cacheHandler);

      if (cacheHandler !== undefined) {
        cacheHandler = _initCache(cacheHandler);
      }

      return cacheHandler;
    };

    this.add = function(cacheHandler, item) {
      if (self.getCache(cacheHandler) !== undefined && self.getCache(cacheHandler).indexOf(item) === -1) {
        return _caches[cacheHandler].push(item);
      } else {
        return undefined;
      }
    };

    this.remove = function(cacheHandler, item) {
      if (self.getCache(cacheHandler) !== undefined) {
        var itemIndex = self.getCache(cacheHandler).indexOf(item);
        if (itemIndex > -1) {
          _caches[cacheHandler].splice(itemIndex, 1);
        }
      } else {
        return undefined;
      }
    };

    this.getCache = function(cacheHandler) {
      if (cacheHandler !== undefined) {
        return _caches[cacheHandler];
      } else {
        return undefined;
      }
    };

    this.getCaches = function() {
      return _caches;
    };

    this.purge = function(cacheHandler) {
      if (self.getCache(cacheHandler) !== undefined) {
        _caches[cacheHandler].length = 0;
      } else {
        return undefined;
      }
    };

    this.destroy = function(cacheHandler) {
      if (self.getCache(cacheHandler) !== undefined) {
        delete _caches[cacheHandler];
      } else {
        return undefined;
      }
    };

    this.destroyAll = function() {
      _caches = {};
    };

    var _randomString = function(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
    };

    var _parseCacheHandler = function(cacheHandler) {
      var generatedCacheHandler;

      if (cacheHandler !== undefined && cacheHandler !== '') {
        generatedCacheHandler = cacheHandler;
      } else if (cacheHandler === undefined) {
        generatedCacheHandler = _randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      }

      return generatedCacheHandler;
    };

    var _getCache = function(cacheHandler) {
      return _caches[cacheHandler];
    };

    var _initCache = function(cacheHandler) {
      if (_getCache(cacheHandler) === undefined) {
        _caches[cacheHandler] = [];
      } else {
        cacheHandler = undefined;
      }
      return cacheHandler;
    };

  });
