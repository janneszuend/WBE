function parseToProto(json, proto){
    return Object.assign(Object.create(proto), JSON.parse(json))
}

let proto = { category: "animal" }
let obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto)
console.log(obj.age)
console.log(obj.category)
