import { Coordinate, Direction } from '..'

export function move(distance: number, position: Coordinate, direction: Direction): Coordinate {
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
        console.log('\x1b[31m%s\x1b[0m', 'Invalid move')
        return position
    }
    return newPosition
}
