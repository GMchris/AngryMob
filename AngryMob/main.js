// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

cc.game.onStart = function(){
    //cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        pregame();
        cc.director.runScene(new MainMenuScene());
    }, this);
};
cc.game.run();

function pregame() {
    Memory.load();

    cc.spriteFrameCache.addSpriteFrames(res.ui_plist, res.ui_png);
    cc.spriteFrameCache.addSpriteFrames(res.main_menu_plist, res.main_menu_png);
    cc.spriteFrameCache.addSpriteFrames(res.lab_plist, res.lab_png);
}