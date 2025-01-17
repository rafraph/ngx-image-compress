import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {ImageCompress} from './image-compress';
import {DOC_ORIENTATION} from './models/DOC_ORIENTATION';
import {UploadResponse} from './models/upload-response';

@Injectable({
  providedIn: 'root'
})
export class NgxImageCompressService {

  private readonly render: Renderer2;

  public DOC_ORIENTATION = DOC_ORIENTATION;

  constructor(rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  public byteCount(image: string) {
    return ImageCompress.byteCount(image);
  }

  public getOrientation(file: File): Promise<DOC_ORIENTATION> {
    return ImageCompress.getOrientation(file);
  }

  public uploadFile(): Promise<UploadResponse> {
    return ImageCompress.uploadFile(this.render, false) as Promise<UploadResponse>;
  }

  public uploadMultipleFiles(): Promise<UploadResponse[]> {
    return ImageCompress.uploadFile(this.render, true) as Promise<UploadResponse[]>;
  }

  public compressFile(image: string, orientation: DOC_ORIENTATION, ratio: number = 50, quality: number = 50, maxwidth: number = 0, maxheight: number = 0): Promise<string> {
    return ImageCompress.compress(image, orientation, this.render, ratio, quality, maxwidth, maxheight);
  }

}
