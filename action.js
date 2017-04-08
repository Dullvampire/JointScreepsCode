var be = require('behavior.js')

module.exports = {
    setVariable: function (name, selector) {
        return (actor, memory) => {
            memory[name] = selector(actor, memory);
            return be.SUCCESS;
        }
    },

    moveTo: function (name) {
        return (actor, memory) => {
            let r = actor.moveTo(memory[name]);

            if (actor.pos.isEqualTo(memory[name])) {
                return be.SUCCESS;
            } else if (r == 0) {
                return be.RUNNING;
            } else {
                return be.FAILURE;
            }
        }
    }
}
