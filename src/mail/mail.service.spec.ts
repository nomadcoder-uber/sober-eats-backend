import { Test } from "@nestjs/testing";
import { CONFIG_OPTIONS } from "src/common/common.constants";
import { MailModule } from "./mail.module";
import { MailService } from "./mail.service"


describe("MailService",()=>{
    let service: MailService;

    beforeEach(async () =>{
        const module = await Test.createTestingModule({
            providers:[MailService, {
                provide:CONFIG_OPTIONS,
                useValue:{
                    apiKey:"test-apiKey",
                    domain:"test-domain",
                    fromEmail:"test-fromEmail",
                }
            }],
        }).compile();
        service = module.get<MailService>(MailService);
    })
    it('should be defined',()=>{
        expect(service).toBeDefined();

    })
})