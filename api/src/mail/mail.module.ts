import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";

@Module({
    imports: [MailModule],
    providers: [MailService],
    exports: [MailService],

})
export class MailModule {}
