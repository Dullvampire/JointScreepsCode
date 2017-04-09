module.exports = {
    isMemorySet: function (name) {
        return (actor, memory) => {
            return memory[name] !== null;
        }
    },

    targetInRange: function (varname, range) {
        return (actor, memory) => {
            if (!memory[varname].pos) {
                console.log("ERROR: Expected RoomObject got '" + memory[varname] + "'");
            }

            return actor.getRangeTo(memory[varname]) <= range;
        };
    },

    isCreepEmpty: function (creep, memory) {
        return _.sum(creep.carry) === 0;
    },

    isCreepFull: function (creep, memory) {
        return _.sum(creep.carry) == creep.carryCapacity;
    }
}
