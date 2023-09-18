export const fileNameToSrc = (fileName) => {
    // S3 Bucket Name
    const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;

    // S3 Region
    const REGION = process.env.REACT_APP_S3_REGION;
  return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`
}