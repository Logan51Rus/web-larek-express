import mongoose from 'mongoose';

interface IImage {
  fileName: string,
  originalName: string
}

interface IProduct {
  title: string,
  image: IImage,
  category: string,
  description?: string,
  price?: number | null,
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line function-paren-newline
const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
},
{
  versionKey: false,
},
);

export default mongoose.model<IProduct>('product', productSchema);
