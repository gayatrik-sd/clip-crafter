import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements AfterViewInit {
  @Input() videoRef!: HTMLVideoElement;
  @Input() detections: any[] = [];

  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;

  private app!: PIXI.Application;
  private graphics!: PIXI.Graphics;

  ngAfterViewInit(): void {
    this.app = new PIXI.Application({
      width: this.videoRef.clientWidth,
      height: this.videoRef.clientHeight,
      backgroundAlpha: 0,
    });

    this.pixiContainer.nativeElement.appendChild(this.app.view);
    this.graphics = new PIXI.Graphics();
    this.app.stage.addChild(this.graphics);

    this.syncWithVideo();
  }

  private syncWithVideo(): void {
    this.app.ticker.add(() => {
      this.graphics.clear();

      const currentTime = this.videoRef.currentTime;
      const matchedFrame = this.detections.find(
        d => Math.abs(d.timestamp - currentTime) < 0.1 // 100ms tolerance
      );

      if (matchedFrame) {
        for (const box of matchedFrame.boxes) {
          const [x1, y1, x2, y2] = box.coordinates;
          const width = x2 - x1;
          const height = y2 - y1;

          // Draw box
          this.graphics.lineStyle(2, 0xff0000, 1);
          this.graphics.drawRect(x1, y1, width, height);

          // Draw label
          const labelText = `${box.label} (${Math.round(box.confidence * 100)}%)`;
          const text = new PIXI.Text(labelText, {
            fontSize: 12,
            fill: '#ff0000',
            fontWeight: 'bold',
          });
          text.position.set(x1, y1 - 18);
          this.app.stage.addChild(text);

          // Remove label on next frame
          this.app.ticker.addOnce(() => this.app.stage.removeChild(text));
        }
      }
    });
  }
}
