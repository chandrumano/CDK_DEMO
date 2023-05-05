import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Tags } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import path from 'path';
import { Networking } from './networking';

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new cdk.aws_s3.Bucket(this, 'MyEncryptedBucket', {
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
    });

    new CfnOutput(this, "DocumentsBucketName", {
      value: bucket.bucketName
    });

    const networking = new Networking(this, 'NetworkingConstruct', {
      maxAzs: 2
    });

    Tags.of(networking).add('Module', 'Networking')
    console.log('TESTING')
    console.log(path.join(__dirname, "../lambda/hello"));
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    // execution environment
      code: lambda.Code.fromAsset(path.join(__dirname, "../lambda/hello")),  // code loaded from "lambda" directory
      handler: 'index.main'                // file is "hello", function is "handler"
    });
  }
}
