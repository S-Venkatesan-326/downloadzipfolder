import { Injectable } from '@nestjs/common';
import { BlobServiceClient} from '@azure/storage-blob';
import * as archiver from 'archiver';
import { Readable } from 'stream';
 
 
@Injectable()
export class BlobStorageService {
   private readonly blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=venkat123;AccountKey=r0bZDd06RubXCCHtXCSmAdpFERcS1kOLfQSYb0KGGGgdQNRr25L132fS9qbo2NGFL/GdLuwyWiSn+AStm9symA==;EndpointSuffix=core.windows.net");
  }

  async downloadFileAsZip(containerName: string, fileName: string): Promise<Readable> {
    const containerClient = this.blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);
    const downloadBlockBlobResponse = await blobClient.download();

    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = Readable.from(downloadBlockBlobResponse.readableStreamBody);

    archive.append(stream, { name: fileName });
    archive.finalize();

    return archive;
  }
}
  
