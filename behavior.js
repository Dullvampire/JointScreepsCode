var doUntil = function (condition) {
    return (...children) => {
        if (children.length <= 0) {
            print("ERROR: Expected Children")
        }

        return (actor, memory) => {
            for (i = 0; i < children.length; i ++) {
                let status = children[i](actor, memory);

                if (status == RUNNING) {
                    return RUNNING;
                }

                if (status == condition) {
                    return condition;
                }
            }

            return !condition;
        }
    };
};

module.exports = {
    SUCCESS: true,
    FAILURE: false,
    RUNNING: null,

    select: doUntil(SUCCESS),
    seq:    doUntil(FAILURE),

    not: function (action) {
        return (actor, memory) => {
            condition = action(actor, memory)
            if (condition == RUNNING) {
                return RUNNING;
            }

            return !condition;
        }
    },

    fail: function (actor, memory) { return FAILURE; }
    succeed: function (actor, memory) { return SUCCESS; }
}
