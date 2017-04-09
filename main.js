var be = require("behavior");
var ac = require("action");
var co = require("condition")

var test = be.seq(
                be.condition(
                    co.isCreepEmpty,
                    be.seq(
                        ac.setVariable("source", ac.findClosest(FIND_SOURCES)),
                        be.condition(be.not(co.targetInRange("source", 1)),
                            ac.moveTo("source")),
                        ac.harvest("source")),
                    be.seq(
                        ac.setVariable("spawn", ac.findClosest(FIND_MY_SPAWNS)),
                        be.condition(be.not(co.targetInRange("spawn", 1)),
                            ac.moveTo("spawn")),
                        ac.transfer("spawn", "energy")));


module.exports.loop = function () {
    Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE])

    for (let c in Game.creeps) {
        test(Game.creeps[c], {})
    }
}
