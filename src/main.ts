import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaProducerService } from './services/kafka.producer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaProducerService = app.get(KafkaProducerService);
  await kafkaProducerService.connect();
  await kafkaProducerService.produceUserInfo();
  await kafkaProducerService.disconnect();
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  await app.close();
}
bootstrap();
