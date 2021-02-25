// import * as path from 'path';
import * as yargs from 'yargs';
import { Upload } from '../upload';


class Command implements yargs.CommandModule {
  public readonly command = 'preupload <S3URL> [OPTIONS]';
  public readonly describe = 'Generate a presign URL for S3 upload';

  public buillder(args: yargs.Argv) {
    args.positional('S3URL', { describe: 'Full S3 object URL e.g. s3://bucket/path/to/object', type: 'string' });
    args.option('ttl', { type: 'number', default: 86400 * 7, desc: 'TTL of the presign URL in seconds' });
    args.option('quiet', { type: 'boolean', default: false, desc: 'mute the output' });
    args.example('s3share preupload s3://mybucket/path/to/object', 'Generate a presign URL for upload');
    return args;
  }

  public async handler(args: any) {
    if (args.debug) console.log(args);
    const ttl = args.ttl ?? 86400 * 7;
    const s3url = args.S3URL;
    const split = s3url.match(/s3:\/\/([^\/]+)\/?(.+)/)
    const bucket = split[1];
    const objectKey = split[2];
    const quiet = args.quiet ?? false;

    if (!quiet) console.log(`Creating presign URL for ${s3url} with TTL=${ttl}s`);

    new Upload({
      bucket,
      key: objectKey,
      expires: ttl,
      debug: args.debug,
    })
      .preupload()
      .catch(err => console.log(err));
  }
}

module.exports = new Command();


