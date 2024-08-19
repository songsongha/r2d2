import { Coordinate } from '..'

export function getRandomNumber() {
    return Math.floor(Math.random() * 100)
}
export function isSamePosition(point1: Coordinate, point2: Coordinate): boolean {
    return point1[0] === point2[0] && point1[1] === point2[1]
}
