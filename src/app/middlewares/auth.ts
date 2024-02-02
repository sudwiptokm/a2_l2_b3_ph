// import { NextFunction, Request, Response } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// import httpStatus from 'http-status';
// import config from '../config';
// import AppError from '../errors/AppError';
// import { TUserRole } from '../modules/User/user.interface';
// import { User } from '../modules/User/user.model';
// import catchAsync from '../utils/catchAsync';

// const auth = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;

//     // checking if the token is missing
//     if (!token) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         'You do not have the necessary permissions to access this resource.',
//       );
//     }

//     // checking if the given token is valid
//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string,
//     ) as JwtPayload;

//     const { role, _id, iat } = decoded;

//     // // checking if the user is exist
//     const user = await User.isUserExistById(_id);

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//     }

//     if (
//       user.passwordChangedAt &&
//       User.isJWTIssuedBeforePasswordChanged(
//         user.passwordChangedAt,
//         iat as number,
//       )
//     ) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
//     }

//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         'You are not authorized  hi!',
//       );
//     }

//     req.user = decoded as JwtPayload;

//     next();
//   });
// };

// export default auth;
