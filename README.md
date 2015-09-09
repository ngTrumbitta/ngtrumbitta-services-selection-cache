# ngTrumbitta Selection Cache service

[![Build Status](https://travis-ci.org/ngTrumbitta/ngtrumbitta-services-selection-cache.svg?branch=master)](https://travis-ci.org/ngTrumbitta/ngtrumbitta-services-selection-cache)

This service scratches one very specific itch I once had for a project I was working on: select multiple items from a list, then do something with each one of them, or all together as a whole.

In other words:

1. Create a cache to store your selected items
2. On click, add an item to the selection cache
3. Use your cache of selected items however you like
4. Create more caches, and use them side by side with the other ones

## Install

```sh
bower install ngtrumbitta-services-selection-cache
```

## Use

```html
<script src="//code.angularjs.org/1.4.5/angular.min.js"></script>
<script src="bowser_components/ngtrumbitta-services-selection-cache/src/selection-cache.service.js"></script>
```

```javascript
angular.module('app.controllers.mycontroller', [
  'ngtrumbitta.services.selectioncache'
  ])
  .controller('myController', function(selectionCacheService, $scope) {
    'use strict';
    var vm = this;

    // try to destroy `myCache` before creating it, just in case
    selectionCacheService.destroy('myCache');
    // create a new named selection cache
    vm.selectionCacheHandler = selectionCacheService.init('myCache');

    // select an unselected item, or deselect an already selected one
    vm.toggleSelected = function(selectedItem) {
      var updatedSelectionCache = selectionCacheService.add(vm.selectionCacheHandler, selectedItem);

      if (angular.isUndefined(updatedSelectionCache)) {
        // selectionCacheService.add returns 'undefined' if the selectedItem was already cached.
        // Given our sample method is **toggle**Selected, this means that we want to deselect that item.
        // selectionCacheService.remove(vm.selectionCacheHandler, selectedItem);
      }

      // delegate the actual use of the selection cache to someone else
      $scope.$emit('heyall.dosomething.withthis', selectionCacheService.getCache(vm.selectionCacheHandler));
    };

  });

```

## License

MIT – See [license file](LICENSE)
