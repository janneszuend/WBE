const fs = require('fs')
fs.stat('csv/population.csv', (err, stats) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(stats)
})

let data = fs.readFileSync('csv/population.csv', 'utf8')

const CSVToJSON = csv => {
    const lines = csv.split('\n')
    const keys = lines[0].split(',')
    return lines.slice(1).map(line => {
        return line.split(',').reduce((acc, cur, i) => {
            const toAdd = {}
            toAdd[keys[i]] = cur
            return { ...acc, ...toAdd }
        }, {})
    })
}
let json = CSVToJSON(data)

fs.writeFileSync('json/population.json', JSON.stringify(json, null, 2))

console.log(json)