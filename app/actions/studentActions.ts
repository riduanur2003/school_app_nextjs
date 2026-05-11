// app/actions/studentActions.ts
'use server';

import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Initialize Neon connection
const sql = neon(process.env.DATABASE_URL!);

// Define Zod schema for student validation
const studentSchema = z.object({
  studentName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  
  gender: z.enum(['male', 'female', 'other']).refine(
  (val) => ['male', 'female', 'other'].includes(val),
  {
    message: "Please select a valid gender"
  }
),
  
  dateOfBirth: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .transform(str => new Date(str))
    .refine(date => date <= new Date(), "Date of birth cannot be in the future")
    .refine(date => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 5 && age <= 100;
    }, "Age must be between 5 and 100 years"),
  
  address: z.string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters"),
  
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .toLowerCase(),
  
  phoneNumber: z.string()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long")
    .regex(/^[\+\d\s\-\(\)]+$/, "Invalid phone number format"),
  
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional().nullable(),
  nationality: z.string().max(100, "Nationality is too long").optional().nullable(),
  visaInformation: z.string().max(500, "Visa information is too long").optional().nullable(),
  emergencyContact: z.string().max(255, "Emergency contact is too long").optional().nullable(),
  registrationNumber: z.string().max(100, "Registration number is too long").optional().nullable(),
  sessionInfo: z.string().max(100, "Session info is too long").optional().nullable(),
  libraryCard: z.string().max(100, "Library card number is too long").optional().nullable(),
  badgeId: z.string().max(100, "Badge ID is too long").optional().nullable(),
});

// Type inference from Zod schema
type StudentFormData = z.infer<typeof studentSchema>;

export async function registerStudent(formData: FormData) {
  // Extract raw data from FormData
  const rawData = {
    studentName: formData.get('studentName'),
    gender: formData.get('gender'),
    dateOfBirth: formData.get('dateOfBirth'),
    address: formData.get('address'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    bloodGroup: formData.get('bloodGroup') || null,
    nationality: formData.get('nationality') || null,
    visaInformation: formData.get('visaInformation') || null,
    emergencyContact: formData.get('emergencyContact') || null,
    registrationNumber: formData.get('registrationNumber') || null,
    sessionInfo: formData.get('sessionInfo') || null,
    libraryCard: formData.get('libraryCard') || null,
    badgeId: formData.get('badgeId') || null,
  };

  // Validate with Zod
  const validationResult = studentSchema.safeParse(rawData);

  if (!validationResult.success) {
    // Return first validation error
    const firstError = validationResult.error.errors[0];
    return {
      success: false,
      error: firstError.message,
      field: firstError.path[0],
      errors: validationResult.error.errors
    };
  }

  const validatedData = validationResult.data;

  try {
    // Insert into database with validated data
    const result = await sql`
      INSERT INTO students (
        student_name,
        gender,
        date_of_birth,
        address,
        email,
        phone_number,
        blood_group,
        nationality,
        visa_information,
        emergency_contact,
        registration_number,
        session_info,
        library_card,
        badge_id
      ) VALUES (
        ${validatedData.studentName},
        ${validatedData.gender},
        ${validatedData.dateOfBirth},
        ${validatedData.address},
        ${validatedData.email},
        ${validatedData.phoneNumber},
        ${validatedData.bloodGroup || null},
        ${validatedData.nationality || null},
        ${validatedData.visaInformation || null},
        ${validatedData.emergencyContact || null},
        ${validatedData.registrationNumber || null},
        ${validatedData.sessionInfo || null},
        ${validatedData.libraryCard || null},
        ${validatedData.badgeId || null}
      )
      RETURNING id, student_name, email;
    `;

    console.log('Student registered successfully:', result[0]);
    
    // Revalidate the students list page
    revalidatePath('/students');
    
    redirect('/student-registration?success=true');
    
    return {
      success: true,
      message: 'Student registered successfully!',
      studentId: result[0].id,
      student: result[0]
    };
    
  } catch (error) {
    console.error('Database error:', error);
    
    // Check for duplicate key errors (PostgreSQL specific)
    if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
      if (error.message.includes('email')) {
        return {
          success: false,
          error: 'A student with this email address already exists',
          field: 'email'
        };
      }
      if (error.message.includes('registration_number')) {
        return {
          success: false,
          error: 'This registration number already exists',
          field: 'registrationNumber'
        };
      }
      if (error.message.includes('phone_number')) {
        return {
          success: false,
          error: 'This phone number is already registered',
          field: 'phoneNumber'
        };
      }
    }
    
    // Generic error
    return {
      success: false,
      error: 'Failed to register student. Please try again later.'
    };
  }
}


