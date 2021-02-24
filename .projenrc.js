const { TypeScriptProject } = require('projen');

const project = new TypeScriptProject ({
  authorName: 'Pahud Hsieh',
  authorEmail: 'pahudnet@gmail.com',
  description: 'Upload any local file to your private Amazon S3 bucket and return a presigned URL for private share.',
  authorUrl: 'https://github.com/pahud/s3share',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.TypeScriptAppProject',
  name: 's3share',
  deps: ['aws-sdk', 'yargs'],
  dependabot: false,
  releaseToNpm: true,
});

project.addBins({ s3share: 'bin/s3share' });

project.synth();
