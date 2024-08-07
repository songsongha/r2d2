import { Coordinate, Direction } from '..'

export function rotateDirection(rotation: 'LEFT' | 'RIGHT', direction: Direction): Direction {
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
