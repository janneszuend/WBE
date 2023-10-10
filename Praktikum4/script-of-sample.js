function scriptOfSample(character, scripts){

    let utfValue = character.charCodeAt(0)
    for (let script of scripts){
        for (let range of script.ranges){
            if(range[0] <= utfValue && range[1] >= utfValue){
                return script.name
            }
        }
    }
    return "unknown"
}


module.exports = { scriptOfSample }