import { Injectable } from '@angular/core';

@Injectable()
export class StringBuilderService {
    builder: Array<string> = [];
    append(value: string): StringBuilderService {
        this.builder.push(value);
        return this;
    }
    toString() {
        let value = '';
        for (const item of this.builder) {
            value += item;
        }
        return value;
    }
    clear() {
        this.builder = [];
    }
}
