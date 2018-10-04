import {Deserialize} from './deserialize.model';

export class Videolist implements Deserialize<Videolist> {
    public videoId: string;
    public title: string;

    deserialize(input: any): Videolist {
        Object.assign(this, input);
        return this;
    }
}


