import { Coordinate, Direction } from '..'

export function reportLocation(r2d2Position: Coordinate, r2d2Direction: Direction, obiWanPosition: Coordinate) {
    console.log('R2D2 is located at', r2d2Position, `and facing ${r2d2Direction}`)
    console.log('Obi Wan is located at', obiWanPosition)
}
