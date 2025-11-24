import fs from 'fs';
import csv from 'csv-parser';
import prisma from '../../config/prisma';
import { AppError } from '../../utils/AppError';


export const parseAndSaveContacts = async (filePath: string, clientId: string) => {
  const contacts: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row: any) => {
        // 1. Validate the Row
        // We expect columns: "name" and "phone" in the CSV
        if (row.name && row.phone) {
          contacts.push({
            clientId: clientId,
            name: row.name,
            phone: row.phone,
            // Optional fields
            neighborhood: row.neighborhood || null,
            customFields: row, // We store the whole row as flexible JSON too
          });
        }
      })
      .on('end', async () => {
        try {
          // 2. Save to Database (Batch Insert)
          if (contacts.length === 0) {
            // Delete file if empty
            fs.unlinkSync(filePath);
            return reject(new AppError('CSV file was empty or had bad column names', 400));
          }

          const result = await prisma.contact.createMany({
            data: contacts,
            skipDuplicates: true, // Don't crash if duplicate ID
          });

          // 3. Cleanup: Delete the temporary uploaded file from the server
          fs.unlinkSync(filePath);

          resolve({ count: result.count, message: 'Import successful' });
        } catch (error) {
          fs.unlinkSync(filePath); // Ensure deletion on error
          reject(error);
        }
      })
      .on('error', (error:any) => {
        fs.unlinkSync(filePath);
        reject(error);
      });
  });
};

// Also need a function to GET the contacts list
export const getContacts = async (clientId: string) => {
  return await prisma.contact.findMany({
    where: { clientId, isDeleted: false },
    orderBy: { createdAt: 'desc' }
  });
};