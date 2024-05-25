export const verifInput = (inputs) => {
    
    for (const oneInput of inputs){
        
        if(oneInput.trim() === "") {
            return ERROR_MESSAGE
        }

    }
    
}