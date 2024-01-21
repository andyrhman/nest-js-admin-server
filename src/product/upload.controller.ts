import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer'
import { extname } from 'path';
import { HasPermission } from 'src/permission/decorator/permission.decorator';

@Controller()
export class UploadController {

    @Post('upload')
    @HasPermission('products')
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
        try {
            return {
                url: `http://localhost:8000/api/uploads/${file.filename}`
            }
        } catch (error) {
            throw new BadRequestException();
        }

    }

    @Get('uploads/:path')
    @HasPermission('products')
    async getImage(
        @Param('path') path,
        @Res() response: Response
    ) {
        response.sendFile(path, { root: 'uploads' });
    }
}