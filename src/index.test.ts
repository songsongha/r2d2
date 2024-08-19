import { findObiWan } from './index'
import { getRandomNumber, isSamePosition } from './utils/helpers'
import { reportLocation } from './commands/report'
import { listValidCommands } from './commands/listValidCommands'
import { move } from './commands/move'
import { rotateDirection } from './commands/rotate'
import readline from 'readline'

// Mock readline module
const mockClose = jest.fn()
jest.mock('readline', () => {
    const responseQueue = ['LAND', 'LAND', 'LAND', 'LEFT', 'LEFT', 'REPORT', 'MOVE 5']

    const mockQuestion = jest.fn((query: string, callback: (input: string) => void) => {
        const response = responseQueue.shift() || 'LAND'
        console.log({ response })
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
    // ...jest.requireActual('./utils/helpers'),
    getRandomNumber: () => mockGetRandomNumber(),
    isSamePosition: () => mockIsSamePosition()
}))

const mockMove = jest.fn().mockName('mockMove')
jest.mock('./commands/move', () => ({
    move: () => mockMove()
}))

const mockReportLocation = jest.fn().mockName('mockReportLocation')
jest.mock('./commands/report', () => ({
    reportLocation: () => mockReportLocation()
}))

const mockRotate = jest.fn().mockName('mockRotate')
jest.mock('./commands/rotate', () => ({
    rotateDirection: () => mockRotate()
}))
const mockListValidCommands = jest.fn().mockName('mockListValidCommands')
jest.mock('./commands/listValidCommands', () => ({
    listValidCommands: () => mockListValidCommands()
}))

describe('findObiWan()', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should call getRandomNumber if the LAND command is input by the user', async () => {
        console.log('TEST1')
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(1)
        expect(mockListValidCommands).toHaveBeenCalledTimes(1)
        expect(mockMove).not.toHaveBeenCalled()
        expect(mockRotate).not.toHaveBeenCalled()
        expect(mockClose).toHaveBeenCalled()
    })
    it('should call rotateDirection function if the LEFT command is input by the user', async () => {
        console.log('TEST 2')
        mockIsSamePosition.mockReturnValueOnce(false).mockReturnValueOnce(true)
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalledTimes(4)
        expect(mockReportLocation).toHaveBeenCalledTimes(1)
        expect(mockListValidCommands).toHaveBeenCalledTimes(1)
        expect(mockMove).not.toHaveBeenCalled()
        expect(mockRotate).toHaveBeenCalledTimes(1)
        expect(mockClose).toHaveBeenCalled()
    })
})
