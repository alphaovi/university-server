import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TStudent,
  TUserName,
  TLocalGuardian,
  StudentModel,
  // StudentMethods,
} from './student.interface';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    max: [20, 'First name cannot be more than 20 characters'],
    // custom validator function
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true, trim: true },
  fatherContactNo: { type: String, required: true, trim: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true, trim: true },
  motherContactNo: { type: String, required: true, trim: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

// create a schema corresponding to the document interface
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true, trim: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    
    name: { type: userNameSchema, required: true, trim: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
      trim: true,
    },
    dateOfBirth: { type: String, trim: true },
    email: { type: String, required: true, trim: true },
    contactNo: { type: String, required: true, trim: true },
    emergencyContactNo: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      trim: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String, trim: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save middleware / hook : will work on create() save()


// query middleware
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query parameter for single student
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// [{$match: {isDeleted: {$ne: true }}} ,{ '$match': { id: 'S12S3456110' } } ]

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
//   id: { type: String, required: true, unique: true, trim: true },
//   name: { type: userNameSchema, required: true, trim: true },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other'],
//     required: true,
//     trim: true,
//   },
//   dateOfBirth: { type: String, trim: true },
//   email: { type: String, required: true, trim: true },
//   contactNo: { type: String, required: true, trim: true },
//   emergencyContactNo: { type: String, required: true, trim: true },
//   bloodGroup: {
//     type: String,
//     trim: true,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   },
//   presentAddress: { type: String, required: true, trim: true },
//   permanentAddress: { type: String, required: true, trim: true },
//   guardian: guardianSchema,
//   localGuardian: localGuardianSchema,
//   profileImg: { type: String, trim: true },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// });

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom static method
// instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
