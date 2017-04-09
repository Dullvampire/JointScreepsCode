var be = require("behavior")

module.exports = {
    setVariable: function (name, selector) {
        return (actor, memory) => {
            memory[name] = selector(actor, memory);
            console.log(actor.name, memory[name], name)
            return be.SUCCESS;
        }
    },

    findClosest: function (findConst) {
        return (actor, memory) => {
            return actor.pos.findClosestByRange(findConst);
        }
    },

    harvest: function (varname) {
        return (actor, memory) => {
            actor.harvest(memory[varname]);
        }
    },

    transfer: function (varname, type) {
        return (actor, memory) => {
            actor.transfer(memory[varname], type);
        }
    },

    moveTo: function (name) {
        return (actor, memory) => {
            let r = actor.moveTo(memory[name]);

            if (actor.pos.isEqualTo(memory[name])) {
                return be.SUCCESS;
            } else if (r === 0) {
                return be.RUNNING;
            } else {
                return be.FAILURE;
            }
        }
    }
}
