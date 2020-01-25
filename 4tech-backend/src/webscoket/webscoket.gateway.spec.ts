import { Test, TestingModule } from '@nestjs/testing';
import { WebscoketGateway } from './webscoket.gateway';

describe('WebscoketGateway', () => {
  let gateway: WebscoketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebscoketGateway],
    }).compile();

    gateway = module.get<WebscoketGateway>(WebscoketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
