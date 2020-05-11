const AWS = require('aws-sdk');

const S3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

async function uploadToS3(file, fileName) {
  const filenameBucket = Math.random() + fileName;
  const buf = Buffer.from(file.replace(/^data:.+;base64,/, ''), 'base64');
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${filenameBucket}`,
    Body: buf,
    ACL: 'public-read',
  };

  await S3.putObject(uploadParams).promise();
  const imageURL = await S3.getSignedUrl('getObject', {
    Bucket: process.env.BUCKET_NAME,
    Key: `${filenameBucket}`,
    Expires: 60 * 60 * 24 * 30,
  });

  return {
    name: fileName,
    url: imageURL.split('?')[0],
    key: filenameBucket,
  };
}

module.exports = {
  uploadToS3,
};
