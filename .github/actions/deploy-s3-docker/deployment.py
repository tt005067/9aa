import os
import boto3
import mimetypes
from botocore.config import Config


def run():
    #! For accessing inputs,we're effectively using special environment variable,and these are environment variables which are automatically generated by GitHub Actions.
    # | For every input, we specify in our action.yml file,GitHub Actions generates an environment variable that starts with INPUT_ and then the name of your input also all caps., : INPUT_BUCKET , so on so forth
    #? Of course, you could still add extra environment variables in your Workflow file and we'll actually do that later.And those environment variables would also be available here.
    bucket = os.environ['INPUT_BUCKET']
    bucket_region = os.environ['INPUT_BUCKET-REGION']
    dist_folder = os.environ['INPUT_DIST-FOLDER']

    configuration = Config(region_name=bucket_region)

    s3_client = boto3.client('s3', config=configuration)

    for root, subdirs, files in os.walk(dist_folder):
        for file in files:
            s3_client.upload_file(
                os.path.join(root, file),
                bucket,
                os.path.join(root, file).replace(dist_folder + '/', ''),
                ExtraArgs={"ContentType": mimetypes.guess_type(file)[0]}
            )

    website_url = f'http://{bucket}.s3-website-{bucket_region}.amazonaws.com'
    # | The below code sets the 'website-url' output (the old ::set-output syntax isn't supported anymore - that's the only thing that changed though)
    with open(os.environ['GITHUB_OUTPUT'], 'a') as gh_output:
        print(f'website-url={website_url}', file=gh_output)


if __name__ == '__main__':
    run()
