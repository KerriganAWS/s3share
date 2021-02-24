import { createReadStream, ReadStream } from 'fs';
import * as AWS from 'aws-sdk';


export interface UploadProps {
  readonly bucket: string;
  readonly key: string;
  readonly filepath: string;
  /**
   * expiration in seconds of the object presigned URL
   * @default - 7 days
   */
  readonly expires?: number;
  /**
   * generate a presign URL for the object
   * @default true
   */
  readonly presignUrl?: boolean;

}

export class Upload {
  readonly options: UploadProps;
  readonly s3client: AWS.S3;
  private debug: boolean;
  constructor(options: UploadProps) {
    this.options = options;
    this.debug = process.env.debug === 'true';
    var credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE ?? 'default' });
    AWS.config.credentials = credentials;
    this.s3client = new AWS.S3({
      region: process.env.AWS_REGION ?? 'us-east-1',
    });
  }
  public async upload() {
    if (this.debug) console.log(`start uploading ${this.options.filepath} to s3://${this.options.bucket}/${this.options.key}`);
    const managedUpload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: this.options.bucket,
        Key: this.options.key,
        Body: readFileStream(this.options.filepath),
      },
      service: this.s3client,
    });

    await managedUpload.promise();

    if (this.options.presignUrl !== false) {
      const url = await this.s3client.getSignedUrlPromise('getObject', {
        Bucket: this.options.bucket,
        Key: this.options.key,
        Expires: this.options.expires ?? 86400 * 7,
      });

      console.log(url);
    }
  }
  public async presign() {
    console.log('start presign URL');

  }
}


function readFileStream(filepath: string): ReadStream {
  var readStream: ReadStream = createReadStream(filepath);
  return readStream;
}
