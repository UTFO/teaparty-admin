import AWS from "aws-sdk";
const {v4: uuidv4} = require("uuid");


async function uploadFile(file) {
  // S3 Bucket Name
  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;

  // S3 Region
  const REGION = process.env.REACT_APP_S3_REGION;

    // S3 Credentials
    const creds = {
      accessKeyId: process.env.REACT_APP_S3_KEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    };

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
    credentials: creds,
  });
  const newName = uuidv4()
  // Files Parameters
  const params = {
    Bucket: S3_BUCKET,
    Key: newName,
    Body: file,
  };

  var upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      // File uploading progress
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

  await upload.then((err, data) => {
    console.log(err);
    alert("File uploaded successfully.");
  });

  // return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`; //no longer storing entire URL
  return newName
};

const deleteFile = async (fileName) => {
  // S3 Bucket Name
  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;

  // S3 Region
  const REGION = process.env.REACT_APP_S3_REGION;

    // S3 Credentials
    const creds = {
      accessKeyId: process.env.REACT_APP_S3_KEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    };

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
    credentials: creds,
  });

  // Files Parameters
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
  };

  var upload = s3
    .deleteObject(params)
    .on("httpUploadProgress", (evt) => {
      // File uploading progress
      console.log(
        "Deleting " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

  await upload.then((err, data) => {
    console.log(err);
    alert("File deleted successfully.");
  });
  
  // return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`; //no longer storing entire URL
}
export { uploadFile, deleteFile };
