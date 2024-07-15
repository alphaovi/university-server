import { NextFunction, Request, Response } from 'express';
// import studentValidationSchema from "../student/student.zod.validation";
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // receive the data from body
    const { password, student: studentData } = req.body;

    // data validation using zod
    // const zodParseData = studentValidationSchema.parse(studentData);

    // creating students collection in db
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    //   res.status(200).json({
    //     success: true,
    //     message: 'Student is created successfully',
    //     data: result,
    //   });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
