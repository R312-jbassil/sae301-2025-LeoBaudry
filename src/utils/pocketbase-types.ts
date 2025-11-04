/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Choisir = "Choisir",
	Commandes = "Commandes",
	CommandesTotaux = "Commandes_totaux",
	Creations = "Creations",
	LignesCommande = "Lignes_commande",
	LogIa = "Log_IA",
	Materiau = "Materiau",
	Modeles = "Modeles",
	PopulariteDesMateriauxParPartie = "Popularite_des_materiaux_par_partie",
	UtilisateursDepenses = "Utilisateurs_Depenses",
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ChoisirPartieCibleeOptions {
	"Verres" = "Verres",
	"Branches" = "Branches",
	"Monture" = "Monture",
}
export type ChoisirRecord = {
	created: IsoAutoDateString
	id: string
	id_creation?: RecordIdString
	id_materiau?: RecordIdString
	partie_ciblee?: ChoisirPartieCibleeOptions
	updated: IsoAutoDateString
}

export enum CommandesStatutOptions {
	"En_cours" = "En_cours",
	"Validé" = "Validé",
	"Expédié" = "Expédié",
}
export type CommandesRecord = {
	created: IsoAutoDateString
	date_commande?: IsoDateString
	id: string
	id_user?: RecordIdString
	statut?: CommandesStatutOptions
	updated: IsoAutoDateString
}

export type CommandesTotauxRecord<Ttotal = unknown> = {
	id: string
	total?: null | Ttotal
}

export type CreationsRecord = {
	created: IsoAutoDateString
	id: string
	id_log_ia?: RecordIdString
	id_modele?: RecordIdString
	id_user?: RecordIdString
	nom_creation?: string
	svg?: string
	updated: IsoAutoDateString
}

export type LignesCommandeRecord = {
	created: IsoAutoDateString
	id: string
	id_commandes?: RecordIdString
	id_creation?: RecordIdString
	quantite?: number
	updated: IsoAutoDateString
}

export type LogIaRecord = {
	created: IsoAutoDateString
	id: string
	id_user?: RecordIdString
	prompt_utilisateur?: string
	reponse_ia?: string
	timestamp?: IsoDateString
	updated: IsoAutoDateString
}

export enum MateriauTypeCibleOptions {
	"Verres" = "Verres",
	"Monture" = "Monture",
	"Branches" = "Branches",
}
export type MateriauRecord = {
	code_valeur?: string
	created: IsoAutoDateString
	id: string
	libelle?: string
	type_cible?: MateriauTypeCibleOptions[]
	updated: IsoAutoDateString
}

export type ModelesRecord = {
	created: IsoAutoDateString
	description?: string
	id: string
	nom_modele?: string
	prix?: number
	svg?: string
	designation?: string
	updated: IsoAutoDateString
}

export enum PopulariteDesMateriauxParPartiePartieCibleeOptions {
	"Verres" = "Verres",
	"Branches" = "Branches",
	"Monture" = "Monture",
}
export type PopulariteDesMateriauxParPartieRecord = {
	id: string
	libelle?: string
	partie_ciblee?: PopulariteDesMateriauxParPartiePartieCibleeOptions
	utilisations?: number
}

export type UtilisateursDepensesRecord<Ttotal_depense = unknown> = {
	email: string
	id: string
	total_depense?: null | Ttotal_depense
}

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type ChoisirResponse<Texpand = unknown> = Required<ChoisirRecord> & BaseSystemFields<Texpand>
export type CommandesResponse<Texpand = unknown> = Required<CommandesRecord> & BaseSystemFields<Texpand>
export type CommandesTotauxResponse<Ttotal = unknown, Texpand = unknown> = Required<CommandesTotauxRecord<Ttotal>> & BaseSystemFields<Texpand>
export type CreationsResponse<Texpand = unknown> = Required<CreationsRecord> & BaseSystemFields<Texpand>
export type LignesCommandeResponse<Texpand = unknown> = Required<LignesCommandeRecord> & BaseSystemFields<Texpand>
export type LogIaResponse<Texpand = unknown> = Required<LogIaRecord> & BaseSystemFields<Texpand>
export type MateriauResponse<Texpand = unknown> = Required<MateriauRecord> & BaseSystemFields<Texpand>
export type ModelesResponse<Texpand = unknown> = Required<ModelesRecord> & BaseSystemFields<Texpand>
export type PopulariteDesMateriauxParPartieResponse<Texpand = unknown> = Required<PopulariteDesMateriauxParPartieRecord> & BaseSystemFields<Texpand>
export type UtilisateursDepensesResponse<Ttotal_depense = unknown, Texpand = unknown> = Required<UtilisateursDepensesRecord<Ttotal_depense>> & BaseSystemFields<Texpand>
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Choisir: ChoisirRecord
	Commandes: CommandesRecord
	Commandes_totaux: CommandesTotauxRecord
	Creations: CreationsRecord
	Lignes_commande: LignesCommandeRecord
	Log_IA: LogIaRecord
	Materiau: MateriauRecord
	Modeles: ModelesRecord
	Popularite_des_materiaux_par_partie: PopulariteDesMateriauxParPartieRecord
	Utilisateurs_Depenses: UtilisateursDepensesRecord
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Choisir: ChoisirResponse
	Commandes: CommandesResponse
	Commandes_totaux: CommandesTotauxResponse
	Creations: CreationsResponse
	Lignes_commande: LignesCommandeResponse
	Log_IA: LogIaResponse
	Materiau: MateriauResponse
	Modeles: ModelesResponse
	Popularite_des_materiaux_par_partie: PopulariteDesMateriauxParPartieResponse
	Utilisateurs_Depenses: UtilisateursDepensesResponse
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
