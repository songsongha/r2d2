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
    const responseQueue = ['LAND', 'MOVE 10', 'LEFT', 'REPORT', 'MOVE 5']

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

const mockGetRandomNumber = jest.fn().mockReturnValue(22)
jest.mock('./utils/helpers', () => ({
    ...jest.requireActual('./utils/helpers'),
    getRandomNumber: () => mockGetRandomNumber()
}))

describe('findObiWan()', () => {
    it('should call getRandomNumber if the LAND command is input by the user', async () => {
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalled()
        expect(mockClose).toHaveBeenCalled()
    })
    it('should call rotateDirection function if the LEFT command is input by the user', async () => {})
})
