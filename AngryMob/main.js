// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

cc.game.onStart = function(){
    //cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(600, 1136, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        pregame();
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();

function pregame() {
    Memory.load();

    // TODO: Delete this functionality later and replace it's functionality before each level starts
    cc.spriteFrameCache.addSpriteFrames(res.common_object_plist, res.common_objects_png);
    cc.spriteFrameCache.addSpriteFrames(res.world_0_plist, res.world_0_png);
}