export default function NumberSelectList (playerCount: number): Array<any> {
    return Array.from(Array(playerCount).keys()).map(index => {
        return {
          value: index + 1,
          label: index + 1
        }
      })
}