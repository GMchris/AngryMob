// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var res = {
    world_01_objects_plist : "res/world_01_objects.plist",
    world_01_objects_png : "res/world_01_objects.png",
    world_01_background_01 : "res/castle_background_01.png",
    world_01_background_02 : "res/castle_background_02.png",
    speed_bar: "res/speed_bar.png",
    speed_bar_emp: "res/speed_bar_empty.png"
};

var g_resources = [];
for (var resource in res) {
    g_resources.push(res[resource]);
}