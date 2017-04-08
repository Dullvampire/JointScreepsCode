module.exports = {
    SUCCESS: true,
    FAILURE: false,
    RUNNING: null,

    select: function (...children) {
        if (children.length <= 0) {
            print("ERROR: Expecting Children");
        }

        return (actor, memory) => {
            for (i = 0; i < children.length; i ++) {
                let status = children[i](actor, memory);
                console.log(status, i, actor)

                if (status == RUNNING) {
                    return RUNNING;
                } else if (status == SUCCESS) {
                    return SUCCESS;
                }
            }

            return FAILURE;
        }
    },

    seq: function (...children) {
        if (children.length <= 0) {
            print("ERROR: Expecting Children");
        }

        return (actor, memory) => {
            for (i = 0; i < children.length; i ++) {
                let status = children[i](actor, memory);
                console.log(status, i, actor)

                if (status == RUNNING) {
                    return RUNNING;
                } else if (status == FAILURE) {
                    return FAILURE;
                }
            }

            return SUCCESS;
        }
    },

    not: function (action) {
        return (actor, memory) => {
            condition = action(actor, memory)
            if (condition == RUNNING) {
                return RUNNING;
            }

            return !condition;
        }
    },

    fail: function (actor, memory) { return FAILURE; },
    succeed: function (actor, memory) { return SUCCESS; }
}
