const {Kafka} = require("kafkajs");
const msg = process.argv[2];
run();
async function run(){
    try
    {
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers" : ["Thomass-MacBook-Air.local:9092"]
        })
        const producer = kafka.producer();
        console.log("Im connecting");
        await producer.connect()
        console.log("Im connected!");
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic":"Users",
            "messages":[
                {
                    "value":msg,
                    "partition":partition
                }
            ]
        })
       
        console.log(`sent succesfully ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch(ex){
        console.error("bad things happened");
    }
    finally{
        process.exit(0);
    }
}