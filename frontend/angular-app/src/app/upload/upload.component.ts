import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploadService } from './upload.service';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
    selector: 'app-upload',
    imports: [OverlayComponent, CommonModule],
    standalone: true,
    templateUrl: './upload.component.html'
})
export class UploadComponent implements AfterViewInit {
    videoUrl: string | null = null;
    detections: any[] = [];
    loading = false;
    videoElement!: HTMLVideoElement;

    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

    constructor(private uploadService: UploadService) { }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (!file) return;

        this.loading = true;

        this.uploadService.uploadVideo(file).subscribe({
            next: (blob) => {
                this.videoUrl = URL.createObjectURL(blob);
                this.uploadService.getDetections().subscribe((data) => {
                    this.detections = data.detections || [];
                    this.loading = false;
                });
            },
            error: (err) => {
                console.error('Upload failed', err);
                this.loading = false;
            }
        });
    }

    ngAfterViewInit(): void {
        if (this.videoPlayer) {
            this.videoElement = this.videoPlayer.nativeElement;
        }
    }
}
