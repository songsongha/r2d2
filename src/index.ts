const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export type Coordinate = [number, number]
export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'

function getUserInput(command: string) {
    return new Promise((resolve) => rl.question('', resolve))
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100)
}
function isSamePosition(point1: Coordinate, point2: Coordinate): boolean {
    return point1[0] === point2[0] && point1[1] === point2[1]
}
function reportLocation(r2d2Position: Coordinate, r2d2Direction: Direction, obiWanPosition: Coordinate) {
    console.log('R2D2 is located at', r2d2Position, `and facing ${r2d2Direction}`)
    console.log('Obi Wan is located at', obiWanPosition)
}
function rotateDirection(rotation: 'LEFT' | 'RIGHT', direction: Direction): Direction {
    const directionArray: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST']
    const index = directionArray.findIndex((item) => item === direction)
    if (rotation === 'LEFT') {
        if (index === 0) return 'WEST'
        return directionArray[index - 1]
    } else {
        if (index === 3) return 'NORTH'
        return directionArray[index + 1]
    }
}
function move(distance: number, position: Coordinate, direction: Direction): Coordinate {
    let newPosition: Coordinate = [...position]
    switch (direction) {
        case 'NORTH':
            newPosition[1] = newPosition[1] + distance
            break
        case 'EAST':
            newPosition[0] = newPosition[0] + distance
            break
        case 'SOUTH':
            newPosition[1] = newPosition[1] - distance
            break
        case 'WEST':
            newPosition[0] = newPosition[0] - distance
    }
    if (newPosition.filter((element) => element < 0 || element > 100).length) {
        console.log('Invalid move')
        return position
    }
    return newPosition
}

function listValidCommands() {
    console.log('')
    console.log('MOVE (x) will move R2-D2 (x) units forward in the direction it is currently facing')
    console.log(
        'LEFT and RIGHT will rotate R2-D2 90 degrees in the specified direction without changing the position of the robot'
    )
    console.log('REPORT will report the location of both R2-D2 and Obi Wan as a grid coordinate and facing direction')
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

        if (command.includes('MOVE')) {
            const split = command.split(' ')
            const distance = Number(split[1])

            if (isNaN(distance)) {
                console.log('Invalid command')
            } else {
                r2d2Position = move(distance, r2d2Position, r2d2Direction)
            }
        } else if (command === 'LEFT') {
            r2d2Direction = rotateDirection('LEFT', r2d2Direction)
        } else if (command === 'RIGHT') {
            r2d2Direction = rotateDirection('RIGHT', r2d2Direction)
        } else if (command === 'REPORT') {
            reportLocation(r2d2Position, r2d2Direction, obiWanPosition)
        } else {
            console.log('Not a valid command')
            listValidCommands()
        }
    }
    console.log('Congratulations you saved the Rebellion!')
    rl.close()
}

findObiWan()
