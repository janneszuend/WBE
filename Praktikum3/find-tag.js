module.exports = { findTag }

function findTag(text) {
    let header = ""
    let activator = false
    for(let i = 0; i < text.length; i++){
        let character = text[i]

        if(activator===true){
            if(character === " "){
                return undefined
            }
            if(character === ">"){
                return header
            }
            header = header + character
        }

        if(character === '<'){
            header = ""
            activator = true
        }
    }
}