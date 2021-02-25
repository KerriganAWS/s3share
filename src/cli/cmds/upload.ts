import * as path from 'path';
import * as yargs from 'yargs';
import { Upload } from '../upload';


class Command implements yargs.CommandModule {
  public readonly command = 'upload <FILE> <BUCKET> [OPTIONS]';
  public readonly describe = 'Upload local file to S3 bucket and return presign URL';

  public buillder(args: yargs.Argv) {
    args.positional('FILE', { describe: 'Local file to upload', type: 'string' });
    args.positional('BUCKET', { describe: 'S3 bucket', type: 'string' });
    args.option('ttl', { type: 'number', default: 86400*7, desc: 'TTL of the presign URL in seconds' });
    args.option('quiet', { type: 'boolean', default: false, desc: 'mute the output' });
    args.example('s3s upload ./image.jpg my-bucket-name', 'Upload ./image.jpg to s3://my-bucket-name');
    return args;
  }

  public async handler(args: any) {
    if (args.debug) console.log(args);
    const filepath = args.FILE;
    const bucket = args.BUCKET;
    const objectKey = path.basename(filepath);
    const ttl = args.ttl ?? 86400*7;
    const quiet = args.quiet ?? false;

    if (!quiet) console.log(`Upload ${filepath} to s3://${bucket}/${objectKey} with TTL=${ttl}s`);

    new Upload({
      bucket,
      filepath,
      key: objectKey,
      expires: ttl,
      debug: args.debug,
    })
      .upload()
      .catch( err => console.log(err) );
  }
}

module.exports = new Command();


