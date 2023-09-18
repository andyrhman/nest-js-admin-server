import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: any): {
        url: string;
    };
    getImage(path: any, response: Response): Promise<void>;
    uploadFileMultiple(files: any): any;
    getImageMultiple(path: any, response: Response): Promise<void>;
}
