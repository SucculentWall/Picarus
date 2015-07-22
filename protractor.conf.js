exports.config = {
  
  capabilities: {
        browserName: 'chrome'
    },

  onPrepare: function() { browser.ignoreSynchronization = true; }

};