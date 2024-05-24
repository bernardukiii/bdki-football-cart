// Randomize team id between a certain number to change teams and to make it more interesting
export default function randomizeTeam(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}