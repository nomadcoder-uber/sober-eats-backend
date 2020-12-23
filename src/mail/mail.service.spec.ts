import { Test } from "@nestjs/testing";
import { CONFIG_OPTIONS } from "src/common/common.constants";
import { MailModule } from "./mail.module";
import { MailService } from "./mail.service"

jest.mock('got',()=>{});
jest.mock('form-data',()=>{
    return{
        append:jest.fn()
    }
})

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
    describe('sendVerificationEmail',()=>{
        it('should call sendEmail',()=>{
            const sendVerificationEmailArgs ={
                email:'email',
                code:'code'
            }
            jest.spyOn(service,'sendEmail').mockImplementation(async ()=>{  //sendEmail이 호출되면 밑에 내가 정의한 코드가 실행된다

            });
            service.sendVerificationEmail(sendVerificationEmailArgs.email,sendVerificationEmailArgs.code)
            expect(service.sendEmail).toHaveBeenCalledTimes(1);
            expect(service.sendEmail).toHaveBeenCalledWith("Verify Your Email", "verify-email",[
                {key:'code',value:sendVerificationEmailArgs.code},
                {key:'username',value:sendVerificationEmailArgs.email},
            ])
        })
    })
})