const parseToProto = require('../../lib/parse-to-proto/parse-to-proto.js')

describe('Parser', function () {
    let proto, obj;

    beforeEach(function() {
        proto = { category: "animal" }
        obj = Parser.parseToProto('{"type":"cat","name":"Mimi","age":3}', proto)
    });

    it('should correctly parse age from JSON', function () {

        expect(obj.age).toEqual(3);
    });

    it('should return category as "animal" from proto', function () {
        expect(obj.category).toEqual('animal');
    });
});
