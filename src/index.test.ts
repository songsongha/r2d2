import { Coordinate, Direction, findObiWan } from './index'
import { getRandomNumber, isSamePosition } from './utils/helpers'
import { reportLocation } from './commands/report'
import { listValidCommands } from './commands/listValidCommands'
import { move } from './commands/move'
import { rotateDirection } from './commands/rotate'
import readline from 'readline'

// Mock readline module
const mockClose = jest.fn()
jest.mock('readline', () => {
    // this is the work around for user input, each test expects a specific input and tests must be done in order
    const responseQueue = [
        'LAND', // called before start of tests
        'LAND', // TEST 1
        'LAND', // TEST 2
        'LEFT',
        'LAND', // TEST 3
        'RIGHT',
        'LAND', // TEST 4
        'MOVE 5',
        'LAND', // TEST 5
        'REPORT',
        'LAND', // TEST 6
        'not a valid command'
    ]

    const mockQuestion = jest.fn((query: string, callback: (input: string) => void) => {
        const response = responseQueue.shift() || 'LAND'
        callback(response)
    })

    return {
        createInterface: jest.fn(() => ({
            question: mockQuestion,
            close: () => mockClose()
        }))
    }
})

const mockGetRandomNumber = jest.fn().mockName('mockGetRandomNumber').mockReturnValue(22)
const mockIsSamePosition = jest.fn().mockName('mockIsSamePosition').mockReturnValue(true)
jest.mock('./utils/helpers', () => ({
    getRandomNumber: () => mockGetRandomNumber(),
    isSamePosition: () => mockIsSamePosition()
}))

const mockMove = jest.fn().mockName('mockMove')
jest.mock('./commands/move', () => ({
    move: (distance: number, r2d2Position: Coordinate, r2d2Direction: Direction) =>
        mockMove(distance, r2d2Position, r2d2Direction)
}))

const mockReportLocation = jest.fn().mockName('mockReportLocation')
jest.mock('./commands/report', () => ({
    reportLocation: () => mockReportLocation()
}))

const mockRotate = jest.fn().mockName('mockRotate')
jest.mock('./commands/rotate', () => ({
    rotateDirection: (input: string) => mockRotate(input)
}))

const mockListValidCommands = jest.fn().mockName('mockListValidCommands')
jest.mock('./commands/listValidCommands', () => ({
    listValidCommands: () => mockListValidCommands()
}))

describe('findObiWan()', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('TEST 1: should call getRandomNumber if the LAND command is input by the user', async () => {
        console.log('TEST1')
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(1)
        expect(mockListValidCommands).toHaveBeenCalledTimes(1)
        expect(mockMove).not.toHaveBeenCalled()
        expect(mockRotate).not.toHaveBeenCalled()
        expect(mockClose).toHaveBeenCalled()
    })
    it('TEST 2: should call rotateDirection function if the LEFT command is input by the user', async () => {
        console.log('TEST 2')
        mockIsSamePosition.mockReturnValueOnce(false).mockReturnValueOnce(true)
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(1)
        expect(mockListValidCommands).toHaveBeenCalledTimes(1)
        expect(mockMove).not.toHaveBeenCalled()
        expect(mockRotate).toHaveBeenCalledWith('LEFT')
        expect(mockClose).toHaveBeenCalled()
    })
    it('TEST 3: should call rotateDirection function if the RIGHT command is input by the user', async () => {
        console.log('TEST 3')
        mockIsSamePosition.mockReturnValueOnce(false).mockReturnValue(true)
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(1)
        expect(mockListValidCommands).toHaveBeenCalledTimes(1)
        expect(mockMove).not.toHaveBeenCalled()
        expect(mockRotate).toHaveBeenCalledWith('RIGHT')
        expect(mockClose).toHaveBeenCalled()
    })
    it('TEST 4: should call move function if the MOVE command is input by the user', async () => {
        console.log('TEST 4')
        mockIsSamePosition.mockReturnValueOnce(false).mockReturnValueOnce(true)
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(1)
        expect(mockListValidCommands).toHaveBeenCalledTimes(1)
        expect(mockMove).toHaveBeenCalledWith(5, [22, 22], 'EAST')
        expect(mockRotate).not.toHaveBeenCalledTimes(1)
        expect(mockClose).toHaveBeenCalled()
    })
    it('TEST 5: should call report function if the REPORT command is input by the user', async () => {
        console.log('TEST 5')
        mockIsSamePosition.mockReturnValueOnce(false).mockReturnValueOnce(true)
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(2)
        expect(mockListValidCommands).toHaveBeenCalledTimes(1)
        expect(mockMove).not.toHaveBeenCalled()
        expect(mockRotate).not.toHaveBeenCalledTimes(1)
        expect(mockClose).toHaveBeenCalled()
    })
    it('TEST 6: should call mockListValidCommands function if an invalid command is input by the user', async () => {
        console.log('TEST 6')
        mockIsSamePosition.mockReturnValueOnce(false).mockReturnValueOnce(true)
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(1)
        expect(mockListValidCommands).toHaveBeenCalledTimes(2)
        expect(mockMove).not.toHaveBeenCalled()
        expect(mockRotate).not.toHaveBeenCalledTimes(1)
        expect(mockClose).toHaveBeenCalled()
    })
})
