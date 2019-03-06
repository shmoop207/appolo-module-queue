import {alias, define,singleton} from 'appolo'
import {Job} from "appolo-queue";
import {handler} from "../../src/decorators";

@define()
@singleton()
export class Handler {

    public working: string;

    @handler("test")
    handle(job: Job) {
       this.working= job.params.param1;
    }
}