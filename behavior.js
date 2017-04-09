global.SUCCESS = true;
global.FAILURE = false;
global.RUNNING = null;

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
                console.log(status, RUNNING, i, actor)

                if (status == RUNNING) {
                    return RUNNING;
                } else if (status == FAILURE) {
                    return FAILURE;
                }
            }

            return SUCCESS;
        }
    },

    memselect: function (varname, ...children) {
        if (children.length <= 0) {
            print("ERROR: Expecting Children");
        }

        return (actor, memory) => {
            const initial = memory[varname] || 0;
            delete memory[varname];
            for (i = initial; i < children.length; i ++) {
                let status = children[i](actor, memory);
                console.log(status, RUNNING, i, actor)

                if (status == RUNNING) {
                    memory[varname] = i;
                } else if (status == FAILURE) {
                    return SUCCESS;
                }
            }

            return FAILURE;
        }
    },

    memseq: function (varname, ...children) {
        if (children.length <= 0) {
            print("ERROR: Expecting Children");
        }

        return (actor, memory) => {
            const initial = memory[varname] || 0;
            delete memory[varname];
            for (i = initial; i < children.length; i ++) {
                let status = children[i](actor, memory);
                console.log(status, RUNNING, i, actor)

                if (status == RUNNING) {
                    memory[varname] = i;
                } else if (status == FAILURE) {
                    return FAILURE;
                }
            }

            return SUCCESS;
        }
    },

    not: function (node) {
        return (actor, memory) => {
            condition = node(actor, memory)

            if (condition == RUNNING) {
                return RUNNING;
            }

            return !condition;
        }
    },

    await: function (node) {
        return (actor, memory) => {
            condition = node(actor, memory)

            if (condition != SUCCESS) {
                return RUNNING;
            }

            return SUCCESS;
        }
    },

    repeat: function (node) {
        status = node(actor, memory);

        while (status == SUCCESS) {
            status = node(actor, memory);
        }

        return status;
    },

    set: function (name) {
        return (actor, memory) => {
            memory[name] = true;
            return SUCCESS;
        };
    },

    clear: function (name) {
        return (actor, memory) => {
            memory[name] = false;
            return SUCCESS;
        };
    },

    is: function (name) {
        return (actor, memory) => {
            return memory[name] ? SUCCESS : FAILURE;
        };
    },

    condition: function (i, t, e) {
        return (actor, memory) => {
            if (i(actor, memory)) {
                return t(actor, memory)
            } else {
                if (!!e) {
                    return e(actor, memory)
                }
            }

            return SUCESS;
        }
    },

    fail: function (actor, memory) { return FAILURE; },
    succeed: function (actor, memory) { return SUCCESS; }
}
