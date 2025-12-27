import type {Request, Response, NextFunction} from 'express'
import { ZodError, type ZodSchema } from 'zod'

// Helper Middleware functions
// Validate the body 
export const validateBody = (schema: ZodSchema) => {
    return (req : Request, res: Response, next: NextFunction) => {
        try {
            // Parse and validate request body
            const validateData = schema.parse(req.body)
            // replace req.body with validateData
            req.body = validateData
            next()
        } catch (e) {
            if ( e instanceof ZodError) {
                // If you dont want to handle ZodError here you can always do it in somewhere in the app Both ways are acceptable.
                return res.status(400).json({
                    error: "Validation Failed",
                    details: e.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                })
            }
            next(e)
        }
    }
}

export const validateParams = (schema: ZodSchema) => {
    return (req : Request, res: Response, next: NextFunction) => {
        try {
            // Parse and validate request body
            // Params is always a string hence no need to validate them 
            schema.parse(req.params)
            // replace req.body with validateData
            next()
        } catch (e) {
            if ( e instanceof ZodError) {
                // If you dont want to handle ZodError here you can always do it in somewhere in the app Both ways are acceptable.
                return res.status(400).json({
                    error: "Invalid Params",
                    details: e.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                })
            }
            next(e)
        }
    }
}

export const validateQuery = (schema: ZodSchema) => {
    return (req : Request, res: Response, next: NextFunction) => {
        try {
            // Parse and validate request body
            // Query is always a string hence no need to validate them 
            schema.parse(req.query)
            // replace req.body with validateData
            next()
        } catch (e) {
            if ( e instanceof ZodError) {
                // If you dont want to handle ZodError here you can always do it in somewhere in the app Both ways are acceptable.
                return res.status(400).json({
                    error: "Invalid Query",
                    details: e.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                })
            }
            next(e)
        }
    }
}