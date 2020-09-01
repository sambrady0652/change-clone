import boto3
from dotenv import load_dotenv

load_dotenv()
s3 = boto3.resource('s3')
bucket = s3.Bucket(name='change-clone')
print(bucket.creation_date)
print(dir(bucket))

file = bucket.upload_file(Filename='s3_test.txt', Key='s3_test')
print(bucket.objects)
obj = bucket.Object('s3_test')
print(dir(obj))
print(f'https://change-clone.s3-us-west-1.amazonaws.com/{obj.key}')