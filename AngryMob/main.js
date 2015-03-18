// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

cc.game.onStart = function(){
    //cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(600, 1136, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        preload();
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();

// TODO: Delete this method later and replace it's functionality before each level starts
function preload() {
    cc.spriteFrameCache.addSpriteFrames(res.world_01_objects_plist, res.world_01_objects_png);
}