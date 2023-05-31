import { Injectable } from '@nestjs/common';
import { BlobServiceClient} from '@azure/storage-blob';
import * as archiver from 'archiver';
import { Readable } from 'stream';
 
 
@Injectable()
export class BlobStorageService {
   private readonly blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString("Your-connection-string");
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
  
