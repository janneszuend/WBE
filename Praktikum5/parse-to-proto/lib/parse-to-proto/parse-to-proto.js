
function parseToProto(json, proto){
    return Object.assign(Object.create(proto), JSON.parse(json))
}

let proto = { category: "animal" }
let obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto)
console.log(obj.age)
console.log(obj.category)

module.exports = {parseToProto}

/*

const parseToProto = require('../../lib/parse-to-proto/parse-to-proto').parseToProto;

describe('parseToProto', function () {
    it('should correctly parse age from JSON', function () {
        const proto = { category: "animal" };
        const obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto);

        expect(obj.age).toEqual(3);
    });

    it('should return category as "animal" from proto', function () {
        const proto = { category: "animal" };
        const obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto);

        expect(obj.category).toEqual('animal');
    });
});
*/
