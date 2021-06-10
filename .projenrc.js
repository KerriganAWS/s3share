const { TypeScriptProject, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new TypeScriptProject ({
  authorName: 'Pahud Hsieh',
  authorEmail: 'pahudnet@gmail.com',
  description: 'Upload any local file to your private Amazon S3 bucket and return a presigned URL for private share.',
  authorUrl: 'https://github.com/pahud/s3share',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.TypeScriptAppProject',
  name: 's3share',
  deps: ['aws-sdk', 'yargs'],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  releaseToNpm: true,
});

project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});

project.addBins({ s3share: 'bin/s3share' });

project.synth();
