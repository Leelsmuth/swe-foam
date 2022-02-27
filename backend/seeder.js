import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import Picture from './models/pictureModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();



// const region = 'us-west-2';
// const bucket = 'take-home-foam-challenge';

const importData = async () => {
  try {
    await Picture.deleteMany();


    AWS.config.update({
      region: process.env.region,
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    });

    const s3 = new AWS.S3();

    const data = await s3.listObjects({
      Bucket: process.env.bucket,
    }).promise();

    const sampleProducts = data.Contents.map((product) => {
      return {
        ...product
      };
    });

    await Picture.insertMany(sampleProducts);

    console.log('Data Imported');
    process.exit();
  } catch (err) {
    console.error(`${err.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Picture.deleteMany();

    console.log('Data Destroyed');
    process.exit();
  } catch (err) {
    console.error(`${err.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
