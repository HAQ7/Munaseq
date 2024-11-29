import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();
const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
export function multerEventLogic() {
  return FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 }, // The field name for the image file
    ],
    {
      storage: multerS3({
        s3: s3Client,
        bucket: bucketName,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,

        key: (req, file, cb) => {
          const fileExt = file.originalname.split('.').pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          cb(null, fileName); // The file name in the S3 bucket
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type, only images is allowed!'), false);
        }
      },
    },
  );
}
export function multerUserLogic() {
  return FileFieldsInterceptor(
    [
      { name: 'cv', maxCount: 1 }, // Field for the PDF
      { name: 'profilePicture', maxCount: 1 }, // Field for the profile image
    ],
    {
      storage: multerS3({
        s3: s3Client,
        bucket: bucketName,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,

        key: (req, file, cb) => {
          const fileExt = file.originalname.split('.').pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          cb(null, fileName); // The file name in the S3 bucket
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'application/pdf' ||
          file.mimetype.startsWith('image/')
        ) {
          cb(null, true);
        } else {
          cb(
            new Error('Invalid file type, only PDF and images are allowed!'),
            false,
          );
        }
      },
    },
  );
}
export function multerAssignmentLogic() {}
// FileFieldsInterceptor(
//   [
//     { name: 'image', maxCount: 1 }, // The field name for the image file
//   ],
//   {
//     storage: multerS3({
//       s3: new S3Client({
//         region,
//         credentials: {
//           accessKeyId,
//           secretAccessKey,
//         },
//       }),
//       bucket: bucketName,
//       acl: 'public-read',
//       contentType: multerS3.AUTO_CONTENT_TYPE,

//       key: (req, file, cb) => {
//         const fileExt = file.originalname.split('.').pop();
//         const fileName = `${file.fieldname}-${uuidv4()}.${fileExt}`;
//         cb(null, fileName); // The file name in the S3 bucket
//       },
//     }),
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//       } else {
//         cb(
//           new Error('Invalid file type, only PDF and images are allowed!'),
//           false,
//         );
//       }
//     },
//   },
// );
