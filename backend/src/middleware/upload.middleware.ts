import multer from 'multer';
import fs from 'fs';
import { AppError } from '../utils/AppError';

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Make filename unique: contacts-TIMESTAMP-OriginalName.csv
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    // Accept common CSV MIME types
    const allowedMimeTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/csv',
        'text/x-csv',
        'application/x-csv',
        'text/comma-separated-values',
        'text/x-comma-separated-values'
    ];

    const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
    const isValidExtension = file.originalname.toLowerCase().endsWith('.csv');

    if (isValidMimeType || isValidExtension) {
        cb(null, true);
    } else {
        cb(new AppError('Not a CSV file! Please upload only CSV.', 400), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB
});