import amqplib from "amqplib";

const RABBITMQ_URL = "amqp://rabbitmq";
const QUEUE_NAME = "messages_queue";

export async function getChannel() {
  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  return channel;
}

export async function sendMessageToQueue(
  channel: amqplib.Channel,
  message: {
    username: string;
    color: string;
    message: string;
  }
) {
  try {
    if (!channel) {
      channel = await getChannel();
    }
    await channel.assertQueue(QUEUE_NAME, { durable: false });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
    console.log("Message sent to queue:", message);
  } catch (error) {
    console.error("Error sending message to queue", error);
  }
}
