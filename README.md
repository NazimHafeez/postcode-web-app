# postcode-web-app
Web application for looking up postcodes

# How to deploy and execute the website
Everything is done by deploy_app_to-S3.sh bash script. I have to hardcode the entries for the Stack and bucket for front end due to the CORs issue. On server side the cross domain origin request url need to be added in the CORs policy for it to work.

The above bash script uses the cloud formation template for deploying S3 bucket for the static website. I have also added a script for provisioning the resource which gets executed by the bash script.

# TODOs: 
- One of the requirement for the excercise was to implement some custom logic for the postcode and return that. 
- Also, I wasn't able to fully implement the AutoComplete functionality, it fetches the results but on clicking each result it doesn't fetches the detailed information of each post code.
- Some tidy up around the CI/CD
- Unit and integration testing

# Prerequisites
- Visual Studio if you want to build and run app locally
- Install the latest version of nodejs
- I have invited you to my AWS free tier account through your email. You need to create your account using the instructions in the email to enable you to log in to AWS console under my account. You have already assigned admin role so will be able to do pretty much everything.
- Once you get past the above stage you need to go and look at the IAM user called "dev_1". This is the user you will be using to connect to the AWS.
- Under this user locate the "Security Credentials" tab and try to create a new Access Key for that user(save that key details locally once created).
- Download AWS CLI if you don't already have it https://awscli.amazonaws.com/AWSCLIV2.msi
- After successfully installing AWS CLI run the command "aws configure --profile dev-1".
- It will prompt you for AWS_ACCESS_KEY_ID and AWS_ACCESS_KEY_SECRET. You should have them from the step above where you created the access key on AWS console for IAM user dev_1
- For region use eu-west-2 and output as json, leave the rest as default.
- Now that you set-up the aws cli you should be able to run aws cli commands without any issues.

# Repositories
 - ASP.NET 8.0 Backend API repo: https://github.com/NazimHafeez/PostcodeApi
 - React App repo: https://github.com/NazimHafeez/postcode-web-app

# Clone Source Repositories Locally
You can test the application locally by running the clone repositories. Run the backend app through visual studio and separately run react front end. Make sure you create .env file at the root of the react app and set environment variable for "REACT_APP_GATEWAY_API_URL"=https://localhost:7076/ or whatever your backend local url is.

# Deployment
Backend stack can be deployed each time someone pushes any changes to main branch or create a pull request through github actions. You can see how it's configured for the CI/CD workflow in .github/workflows/pipeline.yaml file.
For the front end deployment you need to run the bash script which does everything for you through the script.


