import { EChoices } from "enum/choices-boylerplate";
import { EGitName } from "enum/git_name";
import { IAnswers } from "interface/answers.interface";
import path from "node:path";
import fs from "node:fs";
import shelljs from 'shelljs';

class GenerateController{
    public gen(answers:IAnswers){
        try {
            switch (answers.tech) {
                case EChoices.NODEJS_TS:
                    this._execPath(EGitName.NODEJS_TS,answers.folderName);
                    break;
                case EChoices.SCSS:
                    this._execPath(EGitName.SCSS,answers.folderName);
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }

    private _execPath(git_name: string,folderName: string){
        try {
            shelljs.cd(path.resolve());
            shelljs.exec(`git clone git@github.com:troquatte/${git_name}.git`);
            fs.renameSync(
                `${path.join(path.resolve(), git_name)}`,
                `${path.join(path.resolve(), folderName)}`,
              );
            console.log('arquivo criado com sucesso!');
            return shelljs.exit;
        } catch (error) {
            console.log(error)
        }
    }
}

export const GenFile = new GenerateController();