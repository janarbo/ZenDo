import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { sendMail } from "./mail";
import { resetPasswordTemplate } from "./reset-password-template";

@Injectable()
export class MailService {

    async sendPasswordResetEmail(user: User, token: string) {
        console.log('TOKEN', token)
        sendMail(
            {
                from: "janarboke@gmail.com",
                to: user.email,
                subject: "ZenDo Todo List App: Reset Your Password",
                html: resetPasswordTemplate(token, user.id),
              },
              () => {
                console.log('password reset email sent')
              }
        )
        return "Hi"

    }
}
