import { mongoose } from "mongoose";

const projectSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        require: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now()
    },
    customer: {
        type: String,
        trim: true,
        require: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    Colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, 
{
    timestamps: true,
}
);

const Project = mongoose.model('Project', projectSchema);
export default Project;