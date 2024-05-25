export const SUCCES_MESSAGE = "Création avec succès"
export const ERROR_MESSAGE  = "Impossible de créer un nouveau document"
export const NO_AUTH = "Vous n'êtes pas authentifié"
export const INVALID_TOKEN = {type: error, message: "INVALID"}

export const errorInput = (message) => {
    
    return `Impossible de créer un(e) ${message}`
}