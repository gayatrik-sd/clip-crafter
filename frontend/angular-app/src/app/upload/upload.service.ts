import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
    constructor(private http: HttpClient) { }

    uploadVideo(file: File): Observable<Blob> {
        const formData = new FormData();
        formData.append('video', file);
        return this.http.post('/api/upload', formData, { responseType: 'blob' });
    }

    getDetections(): Observable<any> {
        return this.http.get('/api/detections');
    }

    getStatus(): Observable<any> {
        return this.http.get('/api/status');
    }
}
