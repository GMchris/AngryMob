var Visual = {
    /**
     *
     * @param {String} spriteName
     * @param {Number} frameCount
     * @param {Number} fps
     * @returns {cc.RepeatForever}
     */
    createSpriteAnimation: function(spriteName, frameCount, fps) {
        var animationFrames = [];
        for (var i = 0; i < frameCount; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame(spriteName + i + '.png');
            animationFrames.push(frame);
        }
        var animation = new cc.Animation(animationFrames, fps);

        return new cc.RepeatForever(new cc.Animate(animation));
    }
};