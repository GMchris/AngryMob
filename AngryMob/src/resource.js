// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var res = {
    default_font: "res/fonts/Cartwheel.ttf",

    ui_plist: "res/common/ui/ui.plist",
    ui_png: "res/common/ui/ui.png",

    main_menu_plist: "res/common/main_menu/main_menu.plist",
    main_menu_png: "res/common/main_menu/main_menu.png",

    lab_plist: "res/common/lab/lab.plist",
    lab_png: "res/common/lab/lab.png",

    world_0_plist: "res/world_0/world_0.plist",
    world_0_png: "res/world_0/world_0.png",

    world_1_plist: "res/world_1/world_1.plist",
    world_1_png: "res/world_1/world_1.png",

    world_2_plist: "res/world_2/world_2.plist",
    world_2_png: "res/world_2/world_2.png",

    soul_fire_particles: "res/common/particles/soul_particles.plist",
    canister_particles: "res/common/particles/canister_particles.plist",
    terrain_particles: "res/common/particles/terrain_particles.plist",
    dust_particles: "res/common/particles/dust_particles.plist",
    orange_potion_smoke_particles: "res/common/particles/orange_potion_smoke_particles.plist",
    main_menu_fire_particles: "res/common/particles/main_menu_fire_particles.plist",
    magnet_particles: "res/common/particles/magnet_particles.plist",
    electricity_particles: "res/common/particles/electricity_particles.plist"
};

var g_resources = [];
for (var resource in res) {
    g_resources.push(res[resource]);
}