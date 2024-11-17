module "eks_vpc" {
  source             = "terraform-aws-modules/vpc/aws"
  version            = "4.0.1"
  name               = "eks-vpc"
  cidr               = "10.0.0.0/22"
  azs                = ["eu-west-2a", "eu-west-2b"]
  private_subnets    = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets     = ["10.0.3.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = true
}
