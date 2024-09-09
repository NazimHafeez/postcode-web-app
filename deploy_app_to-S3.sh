#!/bin/bash

# Get user input for stack name
read -p "Enter the name of the CloudFormation stack (default=postcode-api-stack): " stack_name
stack_name=${stack_name:-postcode-api-stack}

# Get user input for aws profile
read -p "Enter the name of the aws profile (default=dev-1): " aws_profile
aws_profile=${aws_profile:-dev-1}

# Get user input for aws bucket name
read -p "Enter the name of the aws bucket name for static website (default=postcode-app-bucket): " bucket_name
bucket_name=${bucket_name:-postcode-app-bucket}

static_website_stack_name=hosting-bucket

# Get the API Gateway URL from the stack
api_gateway_endpoint=$(aws cloudformation describe-stacks --stack-name "$stack_name" --profile $aws_profile --query "Stacks[0].Outputs[?OutputKey=='PostcodeApi'].OutputValue" --output text)

# Get the S3 Bucket Name from the stack
#s3_bucket_name=$(aws cloudformation get-template --stack-name "$stack_name" --profile $aws_profile --query "TemplateBody.Resources.PostcodeApiFunction.Properties.Code.S3Bucket" --output text)

# Output the results
echo "API Gateway URL: $api_gateway_endpoint"
echo "S3 Bucket Name: $bucket_name"

# install
npm install

# Create .env file for building
touch .env

# Add the API Gateway endpoint to the .env file
echo "REACT_APP_GATEWAY_API_URL=$api_gateway_endpoint" > .env

# Confirm that the endpoint has been added to the .env file
echo "The API Gateway endpoint has been added to the .env file:"
cat .env

# This is necessary otherwise the stack-delelte command fails
aws s3 rm s3://$bucket_name --recursive --profile $aws_profile

# Create distribution for deployment
npm run build

# remove any stack if it exists
aws cloudformation delete-stack --profile $aws_profile --stack-name $static_website_stack_name

npm run provision

cd build/

# Sync distribution with S3
aws s3 sync . s3://$bucket_name/ --profile $aws_profile

read -p "Press Enter to exit this script" exit