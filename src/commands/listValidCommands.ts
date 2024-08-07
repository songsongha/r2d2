export function listValidCommands() {
    console.log('')
    console.log('Here are the valid commands:')
    console.log('MOVE (x) will move R2-D2 (x) units forward in the direction it is currently facing')
    console.log(
        'LEFT and RIGHT will rotate R2-D2 90 degrees in the specified direction without changing the position of the robot'
    )
    console.log('REPORT will report the location of both R2-D2 and Obi Wan as a grid coordinate and facing direction')
}
