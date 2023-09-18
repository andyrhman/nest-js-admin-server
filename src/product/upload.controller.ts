import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer'
import { extname } from 'path';

@Controller()
export class UploadController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            },
        })
    }))
    uploadFile(@UploadedFile() file) {
        return {
            url : `http://localhost:8000/api/${file.path}`
        }
    }

    @Get('uploads/:path')
    async getImage(
        @Param('path') path,
        @Res() response: Response
    ){
        response.sendFile(path, {root: 'uploads'});
    }

    // * Multiple images
    @Post('upload/multiple')
    @UseInterceptors(FilesInterceptor('image', 20, {
        storage: diskStorage({
            destination: './uploads',
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            },
        })
    }))
    uploadFileMultiple(@UploadedFiles() files) {
        return files.map(file => ({
            url : `http://localhost:8000/api/${file.path}`
        }));
    }

    @Get('uploads/:path')
    async getImageMultiple(
        @Param('path') path,
        @Res() response: Response
    ){
        response.sendFile(path, {root: 'uploads'});
    }
}
