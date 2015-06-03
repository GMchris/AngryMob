// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var res = {
    ui_plist: "res/ui/ui.plist",
    ui_png: "res/ui/ui.png",

    world_0_plist: "res/world_0/world_0.plist",
    world_0_png: "res/world_0/world_0.png",

    particles: "res/common/soul_particles.plist"
};

var g_resources = [];
for (var resource in res) {
    g_resources.push(res[resource]);
}