const {Kafka} = require("kafkajs");

run();
async function run(){
    try
    {
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers" : ["Thomass-MacBook-Air.local:9092"]
        })
        const consumer = kafka.consumer({"groupId":"test"});
        console.log("Im connecting");
        await consumer.connect()
        console.log("Im connected!");
        
        await consumer.subscribe({
            "topic":"Users",
            "fromBeginning":true
        })
       await consumer.run({
           "eachMessage": async result => {console.log(`RVD MSG ${result.message.value} on partition ${result.partition}`)}
       })
    }
    catch(ex){
        console.error("bad things happened");
    }
  
}