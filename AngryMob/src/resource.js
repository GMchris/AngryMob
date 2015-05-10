// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var res = {
    common_object_plist: "res/common/common_objects.plist",
    common_objects_png: "res/common/common_objects.png",

    world_0_plist: "res/world_0/world_0.plist",
    world_0_png: "res/world_0/world_0.png"
};

var g_resources = [];
for (var resource in res) {
    g_resources.push(res[resource]);
}