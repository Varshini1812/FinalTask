function capitalize(x: string): string {
    if (x.length > 0) {
        return x[0].toUpperCase() + ((x.length > 1) ? x.substring(1).toLowerCase() : '');
    }
    return x;
}
function camelCase(x: string) {
    if (x.length > 0) {
        return x[0].toLowerCase() + ((x.length > 1) ? x.substring(1) : '');
    }
    return x;
}

export type AssignFn<TFrom, TTo> = (x: TFrom) => TTo;

export class Mapper<T> {
    private toT = (x: string) => camelCase(x.split('-')
        .map(p => capitalize(p))
        .map(y => y.split('_').map(z => capitalize(z)).join(''))
        .join(''));

    createFrom<X, X1 extends (string & keyof X), T1 extends (string & keyof T), X2 extends (string & keyof X)>(
        source: X,
        maps: Array<[X1, T1]> = [],
        exclude: Array<X2> = [],
        options: Partial<{
            noDefaultMapping: boolean
        }> = {}): T {
        let target: any = {};

        maps.forEach(x => {
            target[x[1]] = source[x[0]];
        });

        if (!options?.noDefaultMapping) {
            let props = Object.keys(source as any)
                .filter(x => exclude.indexOf(x as X2) < 0)
                .map(x => [x, this.toT(x)])

            props.forEach(x => {
                if (x[1] in target) {
                    return;
                }
                if (!!maps.some(r => r[0] == x[0])) {
                    return;
                }
                target[x[1]] = source[x[0] as keyof X];
            });
        }
        return target as T;
    }
}