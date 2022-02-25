import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as SSM from 'aws-cdk-lib/aws-ssm';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, 'checkSSMParameters', {
      code: Code.fromAsset(path.join(__dirname, '../resource')),
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      timeout: Duration.minutes(15),
      memorySize: 1769 // one vCPU
    })

    lambda.addToRolePolicy(new PolicyStatement({
      actions: ['ssm:*', 'ssmmessages:*'],
      resources: ['*']
    }))

    const uid: string = this.getUniqueId()

    new SSM.StringParameter(this, `Work-${uid}`, {
      parameterName: '/acrm/Work',
      description: 'Cheeee',
      stringValue: 'false'
    })
  }

  private getUniqueId (): string {
    return (new Date()).toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\./g, '')
  }
}