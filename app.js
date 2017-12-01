'use strict';

(function(browser) {
  // Local variables.
  var browser = browser;

  // If browser is not defined, the plugin was loaded into Google Chrome.
  if (typeof browser === 'undefined') {
    browser = chrome;
  }

  /**
   * Checks if the page source for a given url can be shown.
   */
  function isValidPageSourceUrl(url) {
    return !url.startsWith('view-source:');
  }

  /**
   * Opens a new tab with the page source.
   */
  browser.browserAction.onClicked.addListener(function(tab) {
    var url = tab.url;

    if (isValidPageSourceUrl(url)) {
      browser.tabs.create({
        url: 'view-source:' + url,
        index: tab.index + 1
      });
    }
  });

  /**
   * Enables or disables the app icon accordingly when changing the url.
   */
  browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (typeof browser.browserAction.disable !== 'undefined') {
      var url = changeInfo.url || tab.url;

      if (isValidPageSourceUrl(url)) {
        browser.browserAction.enable(tabId);
      } else {
        browser.browserAction.disable(tabId);
      }
    }
  });
})(browser);
