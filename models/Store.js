// Store Model
import mongoose from 'mongoose';

const { ObjectId, String } = mongoose.Schema.Types;

const StoreSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    web: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    aboutText: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ["pending", "approved", "declined"]
    }
}, {
    timestamps: true
});

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);