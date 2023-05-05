import * as cdk from "@aws-cdk/core"
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as constructs from "constructs"

interface NetworkingProperties {
    maxAzs: number
}

export class Networking extends constructs.Construct {

    public readonly vpc: ec2.IVpc;

    constructor(scope: constructs.Construct, id: string, props?: NetworkingProperties) {
        super(scope, id);

        this.vpc = new ec2.Vpc(this, "AppVPC", {
            cidr: "10.0.0.0/16",
            maxAzs: props?.maxAzs,
            subnetConfiguration: [
                {
                    subnetType: ec2.SubnetType.PUBLIC,
                    name: "Public",
                    cidrMask: 24
                },
                {
                    cidrMask: 24,
                    name: "Private",
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED
                }
            ]
        })
    }
}