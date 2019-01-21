import {Component} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {VideosService} from "../services/videos.service";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

    result;

    constructor(public dialogRef: MatDialogRef<DialogComponent>, public data: VideosService) {
    }

    delete() {
        this.data.deletePlayList(this.data.deletableIndex);
        this.dialogRef.close();
    }
    save() {
        if (this.data.deleteFromPlaylist === true) {
            this.result = true;
        } else {
            this.result = false;
        }
        this.data.getDeletable(this.data.deletableIndex);
        this.dialogRef.close(this.result);
    }

    close() {
        this.dialogRef.close();
    }
}
