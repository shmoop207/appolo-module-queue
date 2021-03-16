import {App} from '@appolo/engine';

import {LoggerModule} from '@appolo/logger';


export = async function (app: App) {

    if(!app.injector.getInstance("logger")){
        await app.module.load(LoggerModule)
    }


}
