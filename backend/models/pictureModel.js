import mongoose from 'mongoose';

const pictureSchema = mongoose.Schema({
  Key: {
    type: String,
  },
  LastModified: {
    type: Date,
  },
  ETag: {
    type: String,
  },
  ChecksumAlgorithm: {
    type: Array,
  },
  Size: {
    type: Number,
  },
  StorageClass: {
    type: String,
  },
  Owner: {
    DisplayName: {
      type: String,
    },
    ID: {
      type: String,
    },
  },
  category: {
    type: String,
    default: "unclassified",
  }
}, {
  timestamps: true
}
);

const Picture = mongoose.model('Picture', pictureSchema);

export default Picture;