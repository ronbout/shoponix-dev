// Order Model
import mongoose from 'mongoose';
import Product from './Product';

const { ObjectId, String, Number } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    products: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: ObjectId,
                ref: Product
            }
        }
    ],
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ["pending", "delivered"]
    }
},{
    timestamps: true
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);