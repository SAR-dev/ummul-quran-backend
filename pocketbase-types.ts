/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	ClassLogs = "class_logs",
	Invoices = "invoices",
	MonthlyPackages = "monthly_packages",
	StudentInvoices = "student_invoices",
	Students = "students",
	TeacherInvoices = "teacher_invoices",
	Teachers = "teachers",
	Timezones = "timezones",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	superadmin?: boolean
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type ClassLogsRecord = {
	cp_class_mins?: number
	cp_students_price?: number
	cp_teacher?: RecordIdString
	cp_teachers_price?: number
	created?: IsoDateString
	feedback?: string
	finish_at?: IsoDateString
	finished?: boolean
	id: string
	start_at?: IsoDateString
	started?: boolean
	student: RecordIdString
	student_invoice?: RecordIdString
	teacher_invoice?: RecordIdString
	updated?: IsoDateString
}

export enum InvoicesTypeOptions {
	"STUDENT" = "STUDENT",
	"TEACHER" = "TEACHER",
}
export type InvoicesRecord = {
	created?: IsoDateString
	id: string
	type: InvoicesTypeOptions
	unq_id?: string
	updated?: IsoDateString
}

export type MonthlyPackagesRecord = {
	class_mins: number
	created?: IsoDateString
	id: string
	memo?: string
	name: string
	private?: boolean
	students_price: number
	teachers_price: number
	updated?: IsoDateString
}

export enum StudentInvoicesMessageStatusOptions {
	"SUCCESS" = "SUCCESS",
	"ERROR" = "ERROR",
}
export type StudentInvoicesRecord = {
	created?: IsoDateString
	due_amount?: number
	id: string
	invoice: RecordIdString
	message_status?: StudentInvoicesMessageStatusOptions
	note?: string
	paid_amount?: number
	student: RecordIdString
	updated?: IsoDateString
}

export type StudentsRecord = {
	class_link?: string
	created?: IsoDateString
	id: string
	mobile_no?: string
	monthly_package: RecordIdString
	monthly_package_price: number
	nickname: string
	teacher: RecordIdString
	updated?: IsoDateString
	user: RecordIdString
}

export enum TeacherInvoicesMessageStatusOptions {
	"SUCCESS" = "SUCCESS",
	"ERROR" = "ERROR",
}
export type TeacherInvoicesRecord = {
	created?: IsoDateString
	due_amount?: number
	id: string
	invoice: RecordIdString
	message_status?: TeacherInvoicesMessageStatusOptions
	note?: string
	paid_amount?: number
	teacher: RecordIdString
	updated?: IsoDateString
}

export type TeachersRecord = {
	created?: IsoDateString
	id: string
	mobile_no: string
	nickname: string
	updated?: IsoDateString
	user: RecordIdString
}

export type TimezonesRecord = {
	created?: IsoDateString
	id: string
	name: string
	offset?: number
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	location?: string
	password: string
	timezone?: RecordIdString
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ClassLogsResponse<Texpand = unknown> = Required<ClassLogsRecord> & BaseSystemFields<Texpand>
export type InvoicesResponse<Texpand = unknown> = Required<InvoicesRecord> & BaseSystemFields<Texpand>
export type MonthlyPackagesResponse<Texpand = unknown> = Required<MonthlyPackagesRecord> & BaseSystemFields<Texpand>
export type StudentInvoicesResponse<Texpand = unknown> = Required<StudentInvoicesRecord> & BaseSystemFields<Texpand>
export type StudentsResponse<Texpand = unknown> = Required<StudentsRecord> & BaseSystemFields<Texpand>
export type TeacherInvoicesResponse<Texpand = unknown> = Required<TeacherInvoicesRecord> & BaseSystemFields<Texpand>
export type TeachersResponse<Texpand = unknown> = Required<TeachersRecord> & BaseSystemFields<Texpand>
export type TimezonesResponse<Texpand = unknown> = Required<TimezonesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	class_logs: ClassLogsRecord
	invoices: InvoicesRecord
	monthly_packages: MonthlyPackagesRecord
	student_invoices: StudentInvoicesRecord
	students: StudentsRecord
	teacher_invoices: TeacherInvoicesRecord
	teachers: TeachersRecord
	timezones: TimezonesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	class_logs: ClassLogsResponse
	invoices: InvoicesResponse
	monthly_packages: MonthlyPackagesResponse
	student_invoices: StudentInvoicesResponse
	students: StudentsResponse
	teacher_invoices: TeacherInvoicesResponse
	teachers: TeachersResponse
	timezones: TimezonesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'class_logs'): RecordService<ClassLogsResponse>
	collection(idOrName: 'invoices'): RecordService<InvoicesResponse>
	collection(idOrName: 'monthly_packages'): RecordService<MonthlyPackagesResponse>
	collection(idOrName: 'student_invoices'): RecordService<StudentInvoicesResponse>
	collection(idOrName: 'students'): RecordService<StudentsResponse>
	collection(idOrName: 'teacher_invoices'): RecordService<TeacherInvoicesResponse>
	collection(idOrName: 'teachers'): RecordService<TeachersResponse>
	collection(idOrName: 'timezones'): RecordService<TimezonesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
