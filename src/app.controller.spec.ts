import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { BlobStorageService } from './app.service';
import { Readable } from 'stream';

describe('AppController', () => {
  let appController: AppController;
  let blobStorageService: BlobStorageService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [BlobStorageService],
    }).compile();

    appController = app.get<AppController>(AppController);
    blobStorageService = app.get<BlobStorageService>(BlobStorageService);
  });

  describe('downloadFileAsZip', () => {
    it('should return a zip archive', async () => {
      const container = 'test';
      const fileName = 'nature.png';
      const stream = new Readable();

      jest.spyOn(blobStorageService, 'downloadFileAsZip').mockResolvedValue(stream);

      const res = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      }as any;

      await appController.downloadFileAsZip(container, fileName,res);

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/zip');
      expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', `attachment; filename=${fileName}.zip`);
      expect(stream.pipe).toHaveBeenCalledWith(res);
    });
  });
});