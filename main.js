var be = require("behavior");
var ac = require("action");
var ms = require("misc");

var test = be.seq(
                ac.setVariable(
                    "source",
                    ms.getClosestSource),
                ac.moveTo("source"));


module.exports.loop = function () {
    Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE])

    for (let c = 0; c < Game.creeps.length; c ++) {
        test(Game.creeps[c], {})
    }
}
