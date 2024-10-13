import amqplib from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://localhost";
const QUEUE_NAME = "messages_queue";

async function consumeMessages() {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });
    console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        if (msg !== null) {
          console.log("Received message:", msg.content.toString());
          channel.ack(msg); // Confirma que a mensagem foi processada
        }
      },
      {
        noAck: false, // Define que precisamos confirmar a leitura
      }
    );
  } catch (error) {
    console.error("Error consuming messages", error);
  }
}

consumeMessages();
