const {Kafka} = require("kafkajs");
run();
async function run(){
    try
    {
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers" : ["Thomass-MacBook-Air.local:9092"]
        })
        const admin = kafka.admin();
        console.log("Im connecting");
        await admin.connect()
        console.log("Im connected!");
        await admin.createTopics({
            "topics":[{
                "topic" : "Users",
                "numPartitions" : 2
            }]
        })
        console.log("created succesfully");
        await admin.disconnect();
    }
    catch(ex){
        console.error("bad things happened");
    }
    finally{
        process.exit(0);
    }
}