import { Test } from "@nestjs/testing";
import { CONFIG_OPTIONS } from "src/common/common.constants";
import { JwtService } from "./jwt.service";
import * as jwt from 'jsonwebtoken';



jest.mock('jsonwebtoken',()=>{  //module mock
    return{
        sign:jest.fn(() => 'TOKEN'),

    }
})

const TEST_KEY = 'testKey'

describe('JwtService',()=>{
    let service:JwtService;
    beforeEach(async()=>{
        const module = await Test.createTestingModule({
            providers:[JwtService,{
                provide:CONFIG_OPTIONS,
                useValue:{privateKey:TEST_KEY}
            }],
        }).compile();
        service = module.get<JwtService>(JwtService);
    });
    
    it('should be defined', ()=>{
        expect(service).toBeDefined();
})
describe('sign',()=>{
    it("should return a signed token",()=>{
        const ID=1;
        const token = service.sign(1);
        expect(jwt.sign).toHaveBeenCalledTimes(ID);
        expect(jwt.sign).toHaveBeenCalledWith({id:ID},TEST_KEY)


    })
})

})