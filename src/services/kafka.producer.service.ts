import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { kafkaConfig } from '../config/kafka.config';
import { UserService } from '../user-info/user-info.service';
import { UserInfo } from '../user-info/user-info.interface';

@Injectable()
export class KafkaProducerService {
  private producer: Producer;

  constructor(private readonly userService: UserService) {
    this.producer = new Kafka({
      brokers: kafkaConfig.brokers,
    }).producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async produceUserInfo(): Promise<void> {
    const userInfoList: UserInfo[] = await this.userService.getAllUsers();

    for (const userInfo of userInfoList) {
      const message = {
        value: JSON.stringify(userInfo),
      };

      await this.producer.send({
        topic: kafkaConfig.topic,
        messages: [message],
      });
    }
  }
}
