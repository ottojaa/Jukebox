import {Deserialize} from './deserialize.model';

export class Videolist implements Deserialize<Videolist> {
    videoId: string;
    description: string;
    thumbnails: any;
    title: string;
    items: any;
    channelTitle: any;
    id: any;
    snippet: any;
    nextPageToken: string;
    prevPageToken: string;

    deserialize(input: any): Videolist {
        Object.assign(this, input);
        return this;
    }
}


