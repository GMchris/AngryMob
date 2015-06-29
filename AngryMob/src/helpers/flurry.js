var flurry = new (cc.Class.extend({

  logEvent: function(event, data) {
    if (!G.FLURRY) {
      return;
    }
    if (cc.sys.platform === cc.sys.ANDROID) {
      var eventData = JSON.stringify(data);
      jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AppActivity', 'trackEvent', '(Ljava/lang/String;Ljava/lang/String;)V', event, eventData);
    }
  }
}));