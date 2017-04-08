module.exports = {
    getClosestSource: function (actor, memory) {
        return actor.pos.findClosestByRange(FIND_SOURCES)
    }
}
