import { randomInt } from "crypto";
import { randBigInt } from "./../src/utils/uuid-int";
import request from "supertest";
import { app } from "./../src/app"

test("randomInt", () => {
    let a = randBigInt();
    let b = randBigInt();
    //expect(a).toBeLessThan(Number.MAX_SAFE_INTEGER);
    //expect(b).toBeLessThan(Number.MAX_SAFE_INTEGER);
    expect(a == b).toBeFalsy();
});
test("randomInt", () => {
    let a = randomInt(1000, 281474976710655 - 1000);
    let b = randomInt(1000, 281474976710655 - 1000);
    expect(a == b).toBeFalsy();
});
describe('POST /auth/logout', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/auth/logout')
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});