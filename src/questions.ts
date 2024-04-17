import { EChoices } from "enum/choices-boylerplate";
import { EErros } from "enum/erros-validate";
import path from "path";
import fs from 'node:fs'
import { EGitName } from "enum/git_name";

export const questions = [{
    type: 'list',
    name: 'tech',
    message: 'Qual tipo de Boilerplate devo criar?',
    choices: [EChoices.NODEJS_TS,EChoices.SCSS],
},
{
    type: 'input',
    name: 'folderName',
    message: 'Qual o nome devo dar a pasta ao projeto?',
    validate(folderName: string){
        if(!folderName) return EErros.ERROR_NULL;
        if(/[^\w\s-]/.test(folderName)) return EErros.ERROR_CARACTERES;
        if(folderName ===EGitName.NODE_JS || folderName ===EGitName.SCSS ) 
            return EErros.ERROR_PATH;
        try {
            const dir = path.resolve(folderName);
            fs.accessSync(dir,fs.constants.R_OK);
            return EErros.ERROR_INVALID_FOLDER
        } catch (error) {
            
        }
    
        return true;
    },
}]