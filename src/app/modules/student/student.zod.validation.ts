import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: '{VALUE} is not in capitalize format' },
    ),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty('Last name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty('Father name is required'),
  fatherOccupation: z.string().trim().nonempty('Father occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .nonempty('Father contact number is required'),
  motherName: z.string().trim().nonempty('Mother name is required'),
  motherOccupation: z.string().trim().nonempty('Mother occupation is required'),
  motherContactNo: z
    .string()
    .trim()
    .nonempty('Mother contact number is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().nonempty('Local guardian name is required'),
  occupation: z
    .string()
    .trim()
    .nonempty('Local guardian occupation is required'),
  contactNo: z
    .string()
    .trim()
    .nonempty('Local guardian contact number is required'),
  address: z.string().trim().nonempty('Local guardian address is required'),
});

const studentValidationSchema = z.object({
  id: z.string().trim().nonempty('ID is required'),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
  }),
  dateOfBirth: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .nonempty('Email is required'),
  contactNo: z.string().trim().nonempty('Contact number is required'),
  emergencyContactNo: z
    .string()
    .trim()
    .nonempty('Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().trim().nonempty('Present address is required'),
  permanentAddress: z.string().trim().nonempty('Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().trim().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
