import { Request, Response, NextFunction } from "express";
import User from "../Model/User";
import { Iuser } from "../DBModel/Iuser";
import {
    UserValidation,
    UserIdValidation,
} from "../Validations/UserValidations";



const addUser = async (userModelValidation: Iuser) => {
    try {
        const user = new User({
            name: userModelValidation.name,
            age: userModelValidation.age,
            location: userModelValidation.location

        });
        const savedUser = await user.save();

        return savedUser;
    } catch (error) {
        throw new Error("Error while saving user ");
    }
};


export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userModelValidation: Iuser = await UserValidation.validateAsync(req.body);

        if (!userModelValidation) {
            res.status(500).send({ error: "Invalid Details" });
        } else {
            const isUsernameAvailable = await User.findOne({
                name: userModelValidation.name,
            });
            if (isUsernameAvailable) {
                res.status(404).json({
                    message: `Username ${userModelValidation.name} not available`,
                });
            } else {
                const newUser = await addUser(userModelValidation);
                if (newUser) {
                    res.status(201).json({
                        newUser,
                    });
                } else {
                    return next(
                        res.status(400).json({
                            message: "Invalid details provided.",
                        })
                    );
                }
            }
        }
    } catch (error) {
        next(error);
    }
}

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userIdValidation = await UserIdValidation.validateAsync(req.params.userId);

        if (!userIdValidation) {
            res.status(500).send({ error: "Invalid Details" });
        } else {
            const userDetails = await User.findById(userIdValidation);
            if (!userDetails) {
                res.status(404).json({
                    message: `User id not available`,
                });
            } else {
                res.status(200).json({
                    userDetails,
                });
            }
        }
    } catch (error) {
        next(error);
    }
}



export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userModelValidation: Iuser = await UserValidation.validateAsync(req.body);

        if (!userModelValidation) {
            res.status(500).send({ error: "Invalid Details" });
        } else {
            const isUsernameValid = await User.findOne({
                name: userModelValidation.name,
            });
            if (!isUsernameValid) {
                res.status(404).json({
                    message: `Username ${userModelValidation.name} not valid`,
                });
            } else {
                const updatedUser = await User.updateOne(
                    {
                        _id: isUsernameValid._id,
                    },
                    {
                        $set: {
                            name: userModelValidation.name,
                            location: userModelValidation.location,
                        },
                    }
                );
                res.status(201).json({
                    updatedUser,
                });

            }
        }
    } catch (error) {
        next(error);
    }
};

