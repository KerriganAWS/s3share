# `s3share`

Upload any local file to your private Amazon S3 bucket and return a presigned URL for private share.

# Usage

```sh

# upload a local file to s3 bucket and return a presign URL for private download
npx s3share upload FILE BUCKET [OPTIONS] 
# generate a presign URL for private upload later
npx s3share preupload S3URI [OPTIONS]
```

# Sample

## Upload file and generate a presign URL for private download

```sh
# upload to default region and generate a presign URL with 7 days TTL
# This will upload to s3://my-bucket-name/image.png and return a presign URL for download
$ npx s3share upload image.png my-bucket-name --ttl $((86400*7))

# upload to AWS China region(i.e. cn-north-1)
$ AWS_REGION=cn-north-1 AWS_PROFILE=cn npx s3share upload image.png my-bucket-name
```

## Generate a private upload URL


```sh
# let's create an "upload-only" private URL for greeting.txt
$ npx s3share preupload s3://your-bucket-name/greeting.txt
Creating presign URL for s3://your-bucket-name/greeting.txt with TTL=604800s
bucket=your-bucket-name key=greeting.txt
https://your-bucket-name.s3.amazonaws.com/greeting.txt?AWSAccessKeyId=XXXXXXXXXXXX&Expires=1614859590&Signature=RANDOMSTRING
# let's create a new greeting.txt file locally
$ echo "Hello world!" > greeting.txt
# Now, upload it with cURL
$ curl --upload-file ./greeting.txt https://your-bucket-name.s3.amazonaws.com/greeting.txt?AWSAccessKeyId=XXXXXXXXXXXX&Expires=1614859590&Signature=RANDOMSTRING
# check it out 
$ aws s3 ls s3://your-bucket-name/greeting.txt
```

To upload to AWS China regions such as `cn-north-1` and `cn-northwest-1`, make sure you specify `AWS_REGION` environment variable:

```sh
# upload to cn-north-1
$ AWS_REGION=cn-north-1 AWS_PROFILE=cn npx s3share preupload s3://your-bucket-in-china-region/greeting.txt
```
