module.exports = {
    Player: class {
        constructor(name, id, info) {
            this.name = name
            this.id = id
            this.player_info = info
        }
        move = ''
        win_count = 0
        new_move(move) {
            this.move = move
        }
    }
}