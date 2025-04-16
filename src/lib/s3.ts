import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

import { env } from '@/env/server'

class S3 {
  private client = new S3Client({
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    region: env.AWS_BUCKET_REGION,
  })

  put = async ({
    Key,
    Body,
    ContentType,
  }: {
    Key: string
    Body: ArrayBuffer
    ContentType: string
  }) => {
    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key,
      ContentType,
      Body: new Uint8Array(Body),
    })

    return await this.client.send(command)
  }

  delete = async (Key: string) => {
    const command = new DeleteObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key,
    })

    return await this.client.send(command)
  }
}

const s3 = new S3()

export default s3
