import {Deserialize} from './deserialize.model';

export class Videolist implements Deserialize<Videolist> {
    videoId: string;
    description: string;
    thumbnails: any;

    deserialize(input: any): Videolist {
        Object.assign(this, input);
        return this;
    }
}


