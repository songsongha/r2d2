import { getRandomNumber, isSamePosition } from './utils/helpers'
import { reportLocation } from './commands/report'
import { listValidCommands } from './commands/listValidCommands'
import { move } from './commands/move'
import { rotateDirection } from './commands/rotate'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin
})

export type Coordinate = [number, number]
export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'

function getUserInput(command: string) {
    return new Promise((resolve) => rl.question('', resolve))
}

export async function findObiWan() {
    console.log(
        'You must see this droid safely delivered to Obi Wan Kenobi. This is our most desperate hour and you are the only hope.'
    )

    let r2d2Position: Coordinate
    let obiWanPosition: Coordinate
    let r2d2Direction: Direction = 'EAST'
    let command: string = ''

    while (command !== 'LAND') {
        console.log('Please land on Tatooine using the command LAND')
        command = await getUserInput(command).then()
    }

    r2d2Position = [getRandomNumber(), getRandomNumber()]
    obiWanPosition = [getRandomNumber(), getRandomNumber()]
    reportLocation(r2d2Position, r2d2Direction, obiWanPosition)

    listValidCommands()

    while (!isSamePosition(r2d2Position, obiWanPosition)) {
        command = await getUserInput(command).then()
        const moveCommandRegex = /^MOVE (-?\d+)$/

        if (moveCommandRegex.test(command.trim())) {
            const split = command.split(' ')
            const distance = Number(split[1])
            r2d2Position = move(distance, r2d2Position, r2d2Direction)
        } else if (command === 'LEFT') {
            r2d2Direction = rotateDirection('LEFT', r2d2Direction)
        } else if (command === 'RIGHT') {
            r2d2Direction = rotateDirection('RIGHT', r2d2Direction)
        } else if (command === 'REPORT') {
            reportLocation(r2d2Position, r2d2Direction, obiWanPosition)
        } else {
            console.log('\x1b[31m%s\x1b[0m', 'Not a valid command')
            listValidCommands()
        }
    }
    console.log('Congratulations you saved the Rebellion!')
    rl.close()
}

findObiWan()
