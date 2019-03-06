# Appolo Queue

queue module for `appolo` built with [`appolo-queue`](https://github.com/shmoop207/appolo-queue)

## Installation

```typescript
npm i @appolo/queue
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `queue` injection id | `string`|  `queue`|
| `config` | queue options | `object` | `{}` |

### Queue options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `redis` | redis connection string  | `string`|  ``|
| `queueName` | queue prefix in redis | `string` | `appolo-queue` |
| `checkInterval` | queue check time in ms | `number` | 1000 |
| `maxConcurrency` | max number of jobs to process in parallel per server | `number` | 1 |
| `lockTime` | interval in ms of how long the job stays locked when pulled from the queue | `number` | 60000 |

in config/modules/all.ts

```typescript
import {QueueModule} from '@appolo/queue';

export = async function (app: App) {
    await app.module(new QueueModule({
        config:{
            redis:"redis://redis-connection-string",
            queueName:"myQueue"
        }
    }));
}
```

## Usage

```typescript
import {define, singleton,inject} from 'appolo'
import {Queue} from "@appolo/queue";

@define()
@singleton()
export class SomeManager {
    
    @inject() queue:Queue;
    
    async  createTask(data: any): Promise<any> {
         await this.queue.create("test", data).exec();
    }
}

```
In  task handler the name of the handler must be the same as `queue.create`
```typescript
import {define, inject} from 'appolo'
import {Job,handler} from "@appolo/queue";

@define()
export class SomeManager {
    
    @handler("test")
    async  handle(job: Job): Promise<any> {
        //let to some thing with job.params
    }
}

```
## Create Job

### create
#### `create(jobId, [params]):Job`
creates new job instance `params` optional object pasted to the handler
in the end call `exec` to save the job the task will be run `Date.now()`
each job must have uniq id
```js
    queue.handle("test", async (job)=>{
        console.log(job.params.param)
    });

   await queue.create("test", {param: "value"})
         .exec();
```
### delay
#### `delay(time):Job`
create delayed job where time one of the following
the job will run only once
- interval in milisec
- date object
- string in [date](https://github.com/MatthewMueller/date) syntax
```js
    let job = await queue.create("test", {param: "value"})
        .delay(2000)
        .exec();

    await queue.create("test", {param: "value"})
        .delay("in 5 hours")
        .exec();
```

### schedule
#### `schedule(time):Job`
create scheduled job where time one of the following
the job will run every interval
- interval in milisec
- cron job syntax
- date object
- string in  [date](https://github.com/MatthewMueller/date) syntax
```js
    let job = await queue.create("test", {param: "value"})
        .scedule(10 * 60 * 1000)
        .exec();

    await queue.create("test", {param: "value"})
        .delay("every 10 minutes")
        .exec();

    await queue.create("test", {param: "value"})
            .delay("* */10 * * * *")
            .exec();
```

## Handle jobs
Each job has it's own handler
The handler will be called with the job instance and return promise with the job result


### handle
#### `handle(jobId,handler,[options]):Queue`
adds handler to queue by job id
`options`:
- `lockTime`: interval in milisec lock the job while the handler is running
```js
    queue.handle("test", async (job)=>{
        console.log(job.params.param)

        let result = await  doSomething(ob.params.someValue)

        return result
    });

   await queue.create("test", {someValue: "value"})
         .exec();
```

### handler with multiple jobs
you can define one handler to handle multi jobs

```js
    queue.handle("test", async (job)=>{
       //do something
    });

    await queue.create("someId", {someValue: "value"})
         .handler("test")
         .exec();

    await queue.create("someId2", {someValue: "value"})
        .handler("test")
        .exec();
```

## Job
```js
await queue.create("someId2", {someValue: "value"})
    .handler("test")
    .lockTime(10*60*1000) // 10 min
    .repeat(2)
    .retry(3)
    .backoff(2000)
    .exec();
```
### lockTime
#### `lockTime(lockTime: number):Job`
change job lock time default: 60000

### repeat
#### `repeat(value: number):Job`
set the max number of time job will run the default fro schedule in unlimited and for delayed is 1

### retry
#### `retry (value: number):Job`
set the number of retries on job fail default :10 when the number is reached will reschedule the job

### backoff
#### `backoff(value: number) :Job`
set interval in milisec for each retry backoff default:1000

### handler
#### `handler(value: string | Function) :Job`
set job handler id or function

### exec
#### `exec() :Promise<Job>`
save the job to redis if the schedule changed the job will reschedule

### lock
#### `lock(interval:number) :Promise<Job>`
lock job for given interval
this method is called automatically when the handler is called
```js

await queue.create("test", {someValue: "value"})

queue.handle("test",async (job)=>{
    await job.lock(60 *1000);
    //do something
})

```

### run
#### `run(waitForResults:boolean) :Promise<Job> | Promise<any>`
save the job to redis and run it immediately
if waitForResults then promise returned with job result
```js

queue.handle("test",async (job)=>{
    return "some value"
})

let job =  await queue.create("test", {someValue: "value"}).run()

let result =  await queue.create("test", {someValue: "value"}).run(true)

 consloe.log(result) //some value
```
### cancel
#### `cancel() :Promise<void>`
cancel the job and delete from redis

### id
#### `get id():string`
return job id
### params
#### `get  params():any`
return job params
### nextRun
#### `get nextRun(): number`
return job next run unix milisec
### interval
#### `get interval(): number`
return job next run interval milisec
### options
#### `get options()`
return job options

## Job Events
Job events are fired on the Job instances via Redis pubsub
all callbacks called with the job instance

- `Events.JobStart` the job is pulled from the queue and the handler is called
- `Events.JobSuccess` job run is completed successfully result is added the callback args
- `Events.JobFail` job run is failed with error
- `Events.JobComplete` job run is success or failed and the job is returned to the queue

```js
let job = await queue.create("someId2", {someValue: "value"})
    .handler("test")
    .once(Events.JobSuccess,(job,result)=>console.log('weeeee'))
    .exec();
```
### on
#### `on(eventName,callback, [scope]):Job`
register event listener
### once
#### `once(eventName,callback, [scope]):Job`
register event listener, will be removed after one call

### un
#### `un(eventName,callback, [scope]):Job`
remove event listener


## Queue

### initialize
#### `initialize():Promise<void>`
initialize the queue and start pulling interval a promise returned when every thing is ready.

### start
#### `start()`
start pulling jobs from the queue
### stop
#### `stop()`
stop pulling jobs from the queue

### run
#### `run(jobId: string,waitForResult:boolean): Promise<this | any>`
run job by id return the instance or job result when waitForResult true

### getJob
#### `getJob(id: string): Promise<Job>`
get job instance by id

### getAllJobs
#### `getAllJobs(): Promise<Job[]>`
get all jobs in the queue

### hasJob
#### `hasJob(id: string): Promise<boolean>`
return true if job id exist in the queue

### purge
#### `purge()`
delete all jobs in the queue

### reset
#### `reset()`
stop job pulling and purge the queue

## Queue Events
Job events are fired on the Job instances via Redis pubsub
all callbacks called with the job instance

- `Events.JobStart` - the job is pulled from the queue and the handler is called
- `Events.JobSuccess` - job run is completed successfully result is added the callback args
- `Events.JobFail` job - run is failed with error
- `Events.JobComplete` - job run is success or failed and the job is returned to the queue
- `Events.Ready` - the queue finish initialize and start pull interval
- `Events.Error` - some error occurred during the job process

```js
await queue.create("someIs", {someValue: "value"})
    .exec();

queue.once(Events.JobSuccess,(job,result)=>console.log(job.id))

queue.on(Events.Error,(e)=>console.log(e))

```
### on
#### `on(eventName,callback, [scope]):Queue`
register event listener

### once
#### `once(eventName,callback, [scope]):Queue`
register event listener, will be removed after one call

### un
#### `un(eventName,callback, [scope]):Queue`
remove event listener

