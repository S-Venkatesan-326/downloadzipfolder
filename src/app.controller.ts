import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { BlobStorageService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly blobStorageService: BlobStorageService) {}

  @Get(':container/:fileName')
  async downloadFileAsZip(@Param('container') container: string, @Param('fileName') fileName: string, @Res() res: Response) {
    const stream = await this.blobStorageService.downloadFileAsZip(container, fileName);

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${fileName}.zip`,
    });

    stream.pipe(res);
  }
}
