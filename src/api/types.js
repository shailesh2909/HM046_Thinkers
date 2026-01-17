/**
 * API Types and Interfaces Documentation
 * This file documents the data structures used in API requests/responses
 * aligned with the PostgreSQL database schema
 * 
 * Note: This is a JavaScript file with JSDoc comments for documentation purposes.
 * The actual types are not enforced at runtime.
 */

// ============================================
// Company Types
// ============================================

/**
 * @typedef {Object} Company
 * @property {string} id - UUID
 * @property {string} auth_user_id - Foreign Key → auth_users.id
 * @property {string} company_name
 * @property {string} headline
 * @property {string} about
 * @property {string} profile_photo - URL
 * @property {string} banner_photo - URL
 * @property {string} industry
 * @property {string} company_size - e.g., "11-50", "51-200"
 * @property {string} contact_email
 * @property {string} phone_number
 * @property {'work'|'support'|'other'} phone_type
 * @property {string} address
 * @property {string} location
 * @property {string} created_at - timestamp
 * @property {string} updated_at - timestamp
 */

/**
 * @typedef {Object} CompanyWebsite
 * @property {string} id - UUID
 * @property {string} company_id - Foreign Key → companies.id
 * @property {string} website_url
 * @property {'official'|'blog'|'portfolio'|'product'} website_type
 */

// ============================================
// Project Types
// ============================================

/**
 * @typedef {Object} Project
 * @property {string} id - UUID
 * @property {string} company_id - Foreign Key → companies.id
 * @property {string} project_name
 * @property {string} description
 * @property {number} total_budget
 * @property {string} currency - default: INR
 * @property {string} start_date - date
 * @property {string} end_date - date
 * @property {'draft'|'open'|'in_progress'|'completed'|'cancelled'} project_status
 * @property {string} created_at - timestamp
 * @property {string} updated_at - timestamp
 */

/**
 * @typedef {Object} ProjectMilestone
 * @property {string} id - UUID
 * @property {string} project_id - Foreign Key → projects.id
 * @property {string} milestone_title
 * @property {string} description
 * @property {number} amount
 * @property {number} order_no
 * @property {string} start_date - date
 * @property {string} end_date - date
 * @property {'pending'|'in_progress'|'submitted'|'approved'|'paid'|'rejected'} milestone_status
 * @property {string} created_at - timestamp
 * @property {string} updated_at - timestamp
 */

/**
 * @typedef {Object} MilestoneSubmission
 * @property {string} id - UUID
 * @property {string} milestone_id - Foreign Key → project_milestones.id
 * @property {string} freelancer_auth_id - Foreign Key → auth_users.id
 * @property {string} submission_url
 * @property {string} message
 * @property {string} submitted_at - timestamp
 * @property {string|null} reviewed_at - timestamp
 */

/**
 * @typedef {Object} MilestonePayment
 * @property {string} id - UUID
 * @property {string} milestone_id - Foreign Key → project_milestones.id
 * @property {string} freelancer_auth_id - Foreign Key → auth_users.id
 * @property {number} amount
 * @property {string} currency
 * @property {'pending'|'released'|'failed'} payment_status
 * @property {string} transaction_reference
 * @property {string|null} paid_at - timestamp
 */

/**
 * @typedef {Object} ProjectAssignment
 * @property {string} id - UUID
 * @property {string} project_id - Foreign Key → projects.id
 * @property {string} freelancer_auth_id - Foreign Key → auth_users.id
 * @property {'active'|'completed'|'terminated'} assignment_status
 * @property {string} assigned_at - timestamp
 */

// ============================================
// Status Constants
// ============================================

export const PROJECT_STATUS = {
  DRAFT: 'draft',
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const MILESTONE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  PAID: 'paid',
  REJECTED: 'rejected'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  RELEASED: 'released',
  FAILED: 'failed'
};

export const ASSIGNMENT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  TERMINATED: 'terminated'
};

export const PHONE_TYPE = {
  WORK: 'work',
  SUPPORT: 'support',
  OTHER: 'other'
};

export const WEBSITE_TYPE = {
  OFFICIAL: 'official',
  BLOG: 'blog',
  PORTFOLIO: 'portfolio',
  PRODUCT: 'product'
};

// ============================================
// Frontend to Backend Field Mapping
// ============================================

/**
 * Field Name Conversions:
 * 
 * Frontend (camelCase) → Backend (snake_case)
 * 
 * Company:
 * - companyName → company_name
 * - profilePhoto → profile_photo
 * - bannerPhoto → banner_photo
 * - companySize → company_size
 * - contactEmail → contact_email
 * - phoneNumber → phone_number
 * - phoneType → phone_type
 * 
 * Project:
 * - projectName → project_name
 * - totalBudget → total_budget
 * - startDate → start_date
 * - endDate → end_date
 * - projectStatus → project_status
 * 
 * Milestone:
 * - milestoneTitle → milestone_title
 * - orderNo → order_no
 * - milestoneStatus → milestone_status
 * 
 * Payment:
 * - freelancerAuthId → freelancer_auth_id
 * - paymentStatus → payment_status
 * - transactionReference → transaction_reference
 * - paidAt → paid_at
 * 
 * Assignment:
 * - projectId → project_id
 * - freelancerAuthId → freelancer_auth_id
 * - assignmentStatus → assignment_status
 * - assignedAt → assigned_at
 * 
 * Website:
 * - companyId → company_id
 * - websiteUrl → website_url
 * - websiteType → website_type
 * 
 * Submission:
 * - milestoneId → milestone_id
 * - freelancerAuthId → freelancer_auth_id
 * - submissionUrl → submission_url
 * - submittedAt → submitted_at
 * - reviewedAt → reviewed_at
 */
