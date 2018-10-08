import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'numbers'
})
export class NumbersPipe implements PipeTransform {

    transform(input: any, args?: any): any {
        let exp;
        let rounded;
        const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

        if (Number.isNaN(input)) {
            return null;
        }

        if (input < 1000) {
            return input;
        }

        exp = Math.floor(Math.log(input) / Math.log(1000));
        if (input >= 1000000000) {
            return (input / Math.pow(100, exp)).toFixed(args) + suffixes[1];
        }
        return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];


    }
}