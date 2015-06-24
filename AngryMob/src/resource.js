// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var res = {
    default_font: "res/fonts/Cartwheel.ttf",

    ui_plist: "res/ui/ui.plist",
    ui_png: "res/ui/ui.png",

    menu_plist: "res/menu/menu.plist",
    menu_png: "res/menu/menu.png",

    world_0_plist: "res/world_0/world_0.plist",
    world_0_png: "res/world_0/world_0.png",

    soul_fire_particles: "res/common/particles/soul_particles.plist",
    canister_particles: "res/common/particles/canister_particles.plist",
    terrain_particles: "res/common/particles/terrain_particles.plist",
    dust_particles: "res/common/particles/dust_particles.plist"
};

var g_resources = [];
for (var resource in res) {
    g_resources.push(res[resource]);
}