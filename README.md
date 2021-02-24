# `s3share`

Upload any local file to your private Amazon S3 bucket and return a presigned URL for private share.

# Usage

```sh
npx s3share upload FILE BUCKET [OPTIONS]
```

# Sample

```sh
# upload to default region and generate a presign URL with 7 days TTL
$ npx s3share upload image.png my-bucket-name --ttl $((86400*7))


# upload to AWS China region(i.e. cn-north-1)
$ AWS_REGION=cn-north-1 AWS_PROFILE=cn npx s3share upload image.png my-bucket-name
```
