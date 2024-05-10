import { randomInt } from "crypto";

const Generator = (id = 0, seed = 0) => {
    const getNow = () => Math.floor((Date.now() - seed) / 1000);
    let counter = 0;
    let nextTime = 0;
    const next = () => {
        counter = 0;
        nextTime = getNow() + 1;
    };
    const uuid = () => {
        const now = getNow();
        if (now < nextTime) {
            if (counter > 4095) {
                throw Error('uuid out of range');
            }
        } else {
            next();
        }

        const time = (nextTime & 0x1ffffffff) * 2097152;
        const uid = (id & 0x1ff) * 4096;
        const count = counter & 0xfff;
        const uuid = time + uid + count;

        counter++;

        return uuid;
    };
    return { id, seed, uuid };
};

export function randBigInt(): string {
    return (UUIDINT(randomInt(0, 511)).uuid()).toString();
    // there is a better implementation in cypto so this file can be chnaged refer test file
    // but that is integer not outside 48 bits
}

export function UUIDINT(id = 0, seed = 0): { id: number, seed: number, uuid: () => number } {
    if (typeof id !== 'number') {
        throw Error('id need be number');
    }
    if (typeof seed !== 'number') {
        throw Error('seed need be number');
    }
    if (id < 0 || id > 511) {
        throw Error('d must be >=0 or <= 511');
    }
    if (seed < 0 || seed > Date.now()) {
        throw Error('seed must <= now');
    }
    id = Math.floor(id);
    seed = Math.floor(seed);
    const gen = Generator(id, seed);
    gen.id = id;
    gen.seed = seed;
    return gen;
};
